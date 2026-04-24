/**
 * SVG Helper Builders for Mathematical Visualizations
 * 提供常用的数学题图形生成工具函数，避免手写 <svg> 标签
 */

type SVGColor = string;
type Position = { x: number; y: number };

/**
 * 生成座位图：n 行 m 列的网格，支持标记特定位置
 * 用于：排列、排队、座位分配等题型
 */
export function createSeatingChart(
  rows: number,
  cols: number,
  options?: {
    highlight?: [number, number][]; // 需要高亮的 [行, 列]
    labels?: Record<string, string>; // 座位标签
    size?: number; // 座位大小，默认 30
    gap?: number; // 间距，默认 5
  }
): string {
  const size = options?.size ?? 30;
  const gap = options?.gap ?? 5;
  const cellSize = size + gap;
  const width = cols * cellSize + gap;
  const height = rows * cellSize + gap;

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;

  // 背景
  svg += `<rect width="${width}" height="${height}" fill="none" stroke="none"/>`;

  // 绘制座位
  const highlightSet = new Set(options?.highlight?.map(([r, c]) => `${r},${c}`) ?? []);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = gap + c * cellSize + size / 2;
      const y = gap + r * cellSize + size / 2;
      const isHighlight = highlightSet.has(`${r},${c}`);
      const fill = isHighlight ? "hsl(var(--primary))" : "hsl(var(--muted))";
      const stroke = isHighlight ? "hsl(var(--primary))" : "hsl(var(--border))";

      svg += `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;

      // 标签
      const label = options?.labels?.[`${r},${c}`] ?? `${r * cols + c + 1}`;
      svg += `<text x="${x}" y="${y}" text-anchor="middle" dy="0.3em" font-size="12" fill="currentColor" font-weight="500">${label}</text>`;
    }
  }

  svg += `</svg>`;
  return svg;
}

/**
 * 生成方阵对角线图：n×n 方阵，支持标记对角线或特定单元格
 * 用于：排列组合、矩阵类题目
 */
export function createMatrixDiagram(
  n: number,
  options?: {
    highlightDiagonal?: boolean;
    highlightCells?: [number, number][]; // [行, 列]
    cellSize?: number;
  }
): string {
  const cellSize = options?.cellSize ?? 40;
  const size = n * cellSize;

  let svg = `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`;

  const highlightSet = new Set(
    options?.highlightCells?.map(([r, c]) => `${r},${c}`) ?? []
  );

  // 网格线
  for (let i = 0; i <= n; i++) {
    const pos = i * cellSize;
    svg += `<line x1="${pos}" y1="0" x2="${pos}" y2="${size}" stroke="hsl(var(--border))" stroke-width="1"/>`;
    svg += `<line x1="0" y1="${pos}" x2="${size}" y2="${pos}" stroke="hsl(var(--border))" stroke-width="1"/>`;
  }

  // 高亮对角线
  if (options?.highlightDiagonal) {
    for (let i = 0; i < n; i++) {
      const x1 = i * cellSize;
      const y1 = i * cellSize;
      const x2 = (i + 1) * cellSize;
      const y2 = (i + 1) * cellSize;
      svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="hsl(var(--primary))" stroke-width="3"/>`;
    }
  }

  // 高亮特定单元格
  for (const key of highlightSet) {
    const [r, c] = key.split(",").map(Number);
    const x = c * cellSize;
    const y = r * cellSize;
    svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" stroke-width="2"/>`;
  }

  svg += `</svg>`;
  return svg;
}

/**
 * 生成排列树图：展示路径/选择树
 * 用于：排列、组合、决策树题目
 */
export function createDecisionTree(
  levels: string[][],
  options?: {
    size?: number;
  }
): string {
  const size = options?.size ?? 30;
  const levelHeight = 100;
  const width = 800;
  const height = levels.length * levelHeight;

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;

  // 从上到下绘制
  const positions: Position[][] = [];

  for (let level = 0; level < levels.length; level++) {
    const items = levels[level];
    const y = level * levelHeight + 50;
    const spacing = width / (items.length + 1);
    positions[level] = items.map((_, i) => ({
      x: spacing * (i + 1),
      y,
    }));
  }

  // 绘制连接线
  for (let level = 0; level < levels.length - 1; level++) {
    for (const parentPos of positions[level]) {
      for (const childPos of positions[level + 1]) {
        svg += `<line x1="${parentPos.x}" y1="${parentPos.y}" x2="${childPos.x}" y2="${childPos.y}" stroke="hsl(var(--border))" stroke-width="1"/>`;
      }
    }
  }

  // 绘制节点
  for (let level = 0; level < levels.length; level++) {
    for (let i = 0; i < levels[level].length; i++) {
      const pos = positions[level][i];
      const label = levels[level][i];
      svg += `<circle cx="${pos.x}" cy="${pos.y}" r="${size}" fill="hsl(var(--primary))" stroke="hsl(var(--primary-foreground))" stroke-width="2"/>`;
      svg += `<text x="${pos.x}" y="${pos.y}" text-anchor="middle" dy="0.3em" font-size="14" fill="hsl(var(--primary-foreground))" font-weight="600">${label}</text>`;
    }
  }

  svg += `</svg>`;
  return svg;
}

/**
 * 生成竖排条形对比图（轻量版）
 * 用于：简单的数值对比
 */
export function createBarChart(
  data: { label: string; value: number; color?: string }[],
  options?: {
    maxValue?: number;
    barWidth?: number;
  }
): string {
  const maxValue = options?.maxValue ?? Math.max(...data.map((d) => d.value));
  const barWidth = options?.barWidth ?? 60;
  const gap = 10;
  const height = 200;
  const width = data.length * (barWidth + gap) + gap;

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;

  // 横坐标线
  svg += `<line x1="0" y1="${height - 20}" x2="${width}" y2="${height - 20}" stroke="hsl(var(--border))" stroke-width="1"/>`;

  for (let i = 0; i < data.length; i++) {
    const x = gap + i * (barWidth + gap);
    const barHeight = (data[i].value / maxValue) * (height - 40);
    const color = data[i].color ?? "hsl(var(--primary))";

    // 条形
    svg += `<rect x="${x}" y="${height - 20 - barHeight}" width="${barWidth}" height="${barHeight}" fill="${color}" stroke="none"/>`;

    // 标签
    svg += `<text x="${x + barWidth / 2}" y="${height - 5}" text-anchor="middle" font-size="12" fill="hsl(var(--muted-foreground))">${data[i].label}</text>`;

    // 数值
    svg += `<text x="${x + barWidth / 2}" y="${height - 20 - barHeight - 5}" text-anchor="middle" font-size="11" fill="hsl(var(--foreground))" font-weight="600">${data[i].value}</text>`;
  }

  svg += `</svg>`;
  return svg;
}

/**
 * 生成数轴图（简化版，通过 SceneRenderer 的 number-line 通常更好用）
 * 这里提供 SVG 版本供特殊需求使用
 */
export function createNumberLine(
  min: number,
  max: number,
  points: { value: number; label?: string; highlight?: boolean }[],
  options?: {
    height?: number;
  }
): string {
  const height = options?.height ?? 60;
  const width = 600;
  const lineY = 30;
  const padding = 40;

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;

  // 主线
  svg += `<line x1="${padding}" y1="${lineY}" x2="${width - padding}" y2="${lineY}" stroke="hsl(var(--border))" stroke-width="2"/>`;

  // 刻度
  const getX = (val: number) => padding + ((val - min) / (max - min)) * (width - 2 * padding);

  for (const point of points) {
    const x = getX(point.value);
    const color = point.highlight ? "hsl(var(--primary))" : "hsl(var(--border))";
    const size = point.highlight ? 6 : 4;

    svg += `<circle cx="${x}" cy="${lineY}" r="${size}" fill="${color}"/>`;

    if (point.label) {
      svg += `<text x="${x}" y="${lineY + 20}" text-anchor="middle" font-size="12" fill="hsl(var(--foreground))">${point.label}</text>`;
    }
  }

  svg += `</svg>`;
  return svg;
}

/**
 * 生成分组/集合维恩图简图（两个圆相交）
 * 用于：逻辑分组、交集题目
 */
export function createVennDiagram(
  leftLabel: string,
  rightLabel: string,
  leftValue: number,
  intersectionValue: number,
  rightValue: number,
  options?: {
    size?: number;
  }
): string {
  const size = options?.size ?? 60;
  const gap = 20;
  const viewWidth = size * 2 + gap + 100;
  const viewHeight = size + 100;

  let svg = `<svg viewBox="0 0 ${viewWidth} ${viewHeight}" xmlns="http://www.w3.org/2000/svg">`;

  const leftCx = 60;
  const rightCx = 60 + size + gap;
  const cy = viewHeight / 2;

  // 左圆
  svg += `<circle cx="${leftCx}" cy="${cy}" r="${size}" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" stroke-width="2"/>`;

  // 右圆
  svg += `<circle cx="${rightCx}" cy="${cy}" r="${size}" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" stroke-width="2"/>`;

  // 标签与数值
  svg += `<text x="${leftCx - size / 2}" y="${10}" font-size="12" font-weight="600" fill="hsl(var(--foreground))">${leftLabel}</text>`;
  svg += `<text x="${leftCx - size / 2 - 10}" y="${cy}" text-anchor="middle" dy="0.3em" font-size="14" fill="hsl(var(--foreground))" font-weight="600">${leftValue}</text>`;

  svg += `<text x="${rightCx + size / 2 - 30}" y="${10}" font-size="12" font-weight="600" fill="hsl(var(--foreground))">${rightLabel}</text>`;
  svg += `<text x="${rightCx + size / 2 + 10}" y="${cy}" text-anchor="middle" dy="0.3em" font-size="14" fill="hsl(var(--foreground))" font-weight="600">${rightValue}</text>`;

  // 交集（中间）
  svg += `<text x="${(leftCx + rightCx) / 2}" y="${cy}" text-anchor="middle" dy="0.3em" font-size="14" fill="hsl(var(--accent))" font-weight="700">${intersectionValue}</text>`;

  svg += `</svg>`;
  return svg;
}