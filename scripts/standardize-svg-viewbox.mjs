import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

// Standard viewBox sizes with 20px bleed
const STANDARD_SIZES = {
  square: { width: 440, height: 440 },
  horizontal: { width: 440, height: 280 },
  strip: { width: 440, height: 120 },
  vertical: { width: 280, height: 440 },
};

function parseViewBox(viewBox) {
  const parts = viewBox.trim().split(/\s+/);
  return {
    x: parseFloat(parts[0]) || 0,
    y: parseFloat(parts[1]) || 0,
    width: parseFloat(parts[2]),
    height: parseFloat(parts[3]),
  };
}

function determineStandardSize(currentWidth, currentHeight) {
  const aspectRatio = currentWidth / currentHeight;

  // Vertical (height > width)
  if (aspectRatio < 0.8) {
    return 'vertical';
  }
  // Strip (very wide)
  if (aspectRatio > 3) {
    return 'strip';
  }
  // Square or near-square
  if (aspectRatio >= 0.8 && aspectRatio <= 1.25) {
    return 'square';
  }
  // Horizontal rectangle
  return 'horizontal';
}

function detectContentBounds(content) {
  const xCoords = [];
  const yCoords = [];

  // Extract x, y, x1, y1, x2, y2, cx, cy coordinates
  content.replace(/\b(x|x1|x2|cx)="([^"]+)"/g, (match, attr, value) => {
    const num = parseFloat(value);
    if (!isNaN(num) && isFinite(num)) xCoords.push(num);
    return match;
  });

  content.replace(/\b(y|y1|y2|cy)="([^"]+)"/g, (match, attr, value) => {
    const num = parseFloat(value);
    if (!isNaN(num) && isFinite(num)) yCoords.push(num);
    return match;
  });

  if (xCoords.length === 0 || yCoords.length === 0) {
    return null;
  }

  const minX = Math.min(...xCoords);
  const maxX = Math.max(...xCoords);
  const minY = Math.min(...yCoords);
  const maxY = Math.max(...yCoords);
  const contentW = maxX - minX;
  const contentH = maxY - minY;

  // Validate bounds - if too small or invalid, return null
  if (contentW <= 0 || contentH <= 0 || !isFinite(contentW) || !isFinite(contentH)) {
    return null;
  }

  // If content is much smaller than viewBox, it might be just a marker or decorative element
  // Use viewBox as fallback in such cases
  const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
  if (viewBoxMatch) {
    const parts = viewBoxMatch[1].trim().split(/\s+/);
    const vbWidth = parseFloat(parts[2]);
    const vbHeight = parseFloat(parts[3]);
    // If content is less than 50% of viewBox, use viewBox instead
    if (contentW < vbWidth * 0.5 || contentH < vbHeight * 0.5) {
      return null;
    }
  }

  return {
    minX,
    maxX,
    minY,
    maxY,
    contentWidth: contentW,
    contentHeight: contentH,
  };
}

function processSvg(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
  if (!viewBoxMatch) {
    console.log(`No viewBox found in ${filePath}`);
    return;
  }

  const currentViewBox = parseViewBox(viewBoxMatch[1]);
  const sizeType = determineStandardSize(currentViewBox.width, currentViewBox.height);
  const standard = STANDARD_SIZES[sizeType];

  // Detect actual content bounds
  let bounds = detectContentBounds(content);
  let contentW = bounds ? bounds.contentWidth : currentViewBox.width;
  let contentH = bounds ? bounds.contentHeight : currentViewBox.height;
  let minX = bounds ? bounds.minX : currentViewBox.x || 0;
  let minY = bounds ? bounds.minY : currentViewBox.y || 0;

  // Calculate scale to fit content into standard content area (with 20px bleed)
  const targetContentWidth = standard.width - 40; // 20px bleed on each side
  const targetContentHeight = standard.height - 40;
  let scaleX = targetContentWidth / contentW;
  let scaleY = targetContentHeight / contentH;
  let scale = Math.min(scaleX, scaleY); // Use uniform scaling

  // Validate scale - prevent extreme values
  if (!isFinite(scale) || scale < 0.1 || scale > 10) {
    console.log(`Warning: Invalid scale ${scale} for ${filePath}, using viewBox-based scaling`);
    // Fallback to viewBox-based scaling
    bounds = null;
    contentW = currentViewBox.width;
    contentH = currentViewBox.height;
    minX = currentViewBox.x || 0;
    minY = currentViewBox.y || 0;
    scaleX = targetContentWidth / contentW;
    scaleY = targetContentHeight / contentH;
    scale = Math.min(scaleX, scaleY);
  }

  // Calculate offset to center scaled content
  const scaledContentW = contentW * scale;
  const scaledContentH = contentH * scale;
  const offsetX = 20 + (targetContentWidth - scaledContentW) / 2 - minX * scale;
  const offsetY = 20 + (targetContentHeight - scaledContentH) / 2 - minY * scale;

  // Validate offsets
  if (!isFinite(offsetX) || !isFinite(offsetY)) {
    console.log(`Warning: Invalid offsets for ${filePath}, skipping transformation`);
    return;
  }

  // Update viewBox
  let updated = content.replace(
    /viewBox="([^"]+)"/,
    `viewBox="0 0 ${standard.width} ${standard.height}"`
  );

  // Transform x, x1, x2, cx attributes
  updated = updated.replace(/\b(x|x1|x2|cx)="([^"]+)"/g, (match, attr, value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return match;
    return `${attr}="${(num * scale + offsetX).toFixed(2)}"`;
  });

  // Transform y, y1, y2, cy attributes
  updated = updated.replace(/\b(y|y1|y2|cy)="([^"]+)"/g, (match, attr, value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return match;
    return `${attr}="${(num * scale + offsetY).toFixed(2)}"`;
  });

  // Transform width and height attributes
  updated = updated.replace(/\b(width|height)="([^"]+)"/g, (match, attr, value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return match;
    return `${attr}="${(num * scale).toFixed(2)}"`;
  });

  // Skip path d attribute transformation - complex path syntax requires manual review
  // Files with paths will need manual adjustment

  writeFileSync(filePath, updated);
  console.log(`Updated ${filePath}: ${currentViewBox.width}x${currentViewBox.height} → ${standard.width}x${standard.height} (${sizeType}), scale=${scale.toFixed(3)}, bounds=${bounds ? `${contentW.toFixed(0)}x${contentH.toFixed(0)}` : 'N/A'}`);
}

async function main() {
  const svgFiles = await glob('src/data/**/*.svg', { cwd: process.cwd() });

  console.log(`Found ${svgFiles.length} SVG files to process...`);

  for (const file of svgFiles) {
    processSvg(file);
  }

  console.log('Done!');
}

main().catch(console.error);
