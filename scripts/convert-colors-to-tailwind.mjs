#!/usr/bin/env node
/**
 * Convert all inline RGB/hex colors in SVG files to Tailwind CSS classes.
 *
 * This script replaces inline color attributes (fill, stroke) with Tailwind classes
 * to ensure theme-aware styling and consistency.
 *
 * Run: node scripts/convert-colors-to-tailwind.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

// Color mappings: hex/rgb -> Tailwind class
const COLOR_MAPPINGS = {
  // Blue tones
  "rgb(46 134 193 / 0.08)": { fill: "fill-blue-500/8", stroke: null },
  "rgb(46 134 193 / 0.10)": { fill: "fill-blue-500/10", stroke: null },
  "rgb(46 134 193 / 0.12)": { fill: "fill-blue-500/12", stroke: null },
  "#3498db": { fill: "fill-blue-500", stroke: "stroke-blue-500" },

  // Red tones
  "rgb(169 50 38 / 0.28)": { fill: "fill-red-500/10", stroke: null },
  "rgb(169 50 38 / 0.30)": { fill: "fill-red-500/10", stroke: null },
  "rgb(169 50 38 / 0.35)": { fill: "fill-red-500/10", stroke: null },
  "#A93226": { fill: "fill-red-800", stroke: "stroke-red-800" },
  "#a93226": { fill: "fill-red-800", stroke: "stroke-red-800" },
  "#C0392B": { fill: "fill-red-800", stroke: "stroke-red-800" },
  "#c0392b": { fill: "fill-red-800", stroke: "stroke-red-800" },
  "#e74c3c": { fill: "fill-red-500", stroke: "stroke-red-500" },
  "#E74C3C": { fill: "fill-red-500", stroke: "stroke-red-500" },

  // Yellow/Amber tones
  "rgb(241 196 15 / 0.30)": { fill: "fill-amber-500/10", stroke: null },
  "rgb(241 196 15 / 0.32)": { fill: "fill-amber-500/32", stroke: null },
  "#B7950B": { fill: "fill-amber-700", stroke: "stroke-amber-700" },
  "#b7950b": { fill: "fill-amber-700", stroke: "stroke-amber-700" },
  "#B9770E": { fill: "fill-yellow-700", stroke: "stroke-yellow-700" },
  "#b9770e": { fill: "fill-yellow-700", stroke: "stroke-yellow-700" },

  // Orange tones
  "#E67E22": { fill: "fill-orange-600", stroke: "stroke-orange-600" },
  "#e67e22": { fill: "fill-orange-600", stroke: "stroke-orange-600" },
  "#fdebd0": { fill: "fill-orange-100", stroke: null },

  // Green tones
  "#27ae60": { fill: "fill-green-600", stroke: "stroke-green-600" },
  "#27AE60": { fill: "fill-green-600", stroke: "stroke-green-600" },
  "#abebc6": { fill: "fill-green-200", stroke: null },
  "#1E8449": { fill: "fill-green-800", stroke: "stroke-green-800" },
  "#1e8449": { fill: "fill-green-800", stroke: "stroke-green-800" },

  // Other
  "#b9770e": { fill: "fill-yellow-700", stroke: "stroke-yellow-700" },
};

function rewrite(svg) {
  let s = svg;
  let changed = 0;

  // Replace each color mapping
  for (const [color, mapping] of Object.entries(COLOR_MAPPINGS)) {
    // Replace fill attributes
    if (mapping.fill) {
      const fillRe = new RegExp(`fill=(["'])${escapeRegex(color)}\\1`, "gi");
      s = s.replace(fillRe, (match, quote) => {
        changed += 1;
        // If the element already has a class attribute, append to it
        const classMatch = match.match(/class=(["'])([^"']*)\1/);
        if (classMatch) {
          const existingClass = classMatch[2];
          const newClass = `${existingClass} ${mapping.fill}`;
          return match.replace(/class=(["'])[^"']*\1/, `class=${quote}${newClass}${quote}`).replace(/fill=["'][^"']*["']/, '');
        } else {
          return match.replace(/fill=["'][^"']*["']/, `class="${mapping.fill}"`);
        }
      });
    }

    // Replace stroke attributes
    if (mapping.stroke) {
      const strokeRe = new RegExp(`stroke=(["'])${escapeRegex(color)}\\1`, "gi");
      s = s.replace(strokeRe, (match, quote) => {
        changed += 1;
        const classMatch = match.match(/class=(["'])([^"']*)\1/);
        if (classMatch) {
          const existingClass = classMatch[2];
          const newClass = `${existingClass} ${mapping.stroke}`;
          return match.replace(/class=(["'])[^"']*\1/, `class=${quote}${newClass}${quote}`).replace(/stroke=["'][^"']*["']/, '');
        } else {
          return match.replace(/stroke=["'][^"']*["']/, `class="${mapping.stroke}"`);
        }
      });
    }
  }

  return { svg: s, changed };
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function walkSvgs(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) out.push(...walkSvgs(p));
    else if (name.endsWith(".svg")) out.push(p);
  }
  return out;
}

const files = [
  ...walkSvgs(path.join(ROOT, "src/data/problems/figures")),
  ...walkSvgs(path.join(ROOT, "src/data/knowledge/figures")),
];

let totalFiles = 0;
let totalChanges = 0;
for (const f of files) {
  const raw = fs.readFileSync(f, "utf8");
  const { svg, changed } = rewrite(raw);
  if (changed > 0) {
    fs.writeFileSync(f, svg);
    totalFiles += 1;
    totalChanges += changed;
    console.log(`✓ ${path.relative(ROOT, f)}  (${changed} substitutions)`);
  }
}
console.log(`\nDone. ${totalFiles} files updated, ${totalChanges} color substitutions.`);
