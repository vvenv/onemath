/**
 * SVG figure builders for math problem visualizations.
 *
 * Each helper returns a single-line SVG string suitable for `SvgFigure` (and
 * therefore for the `svg` scene kind). All helpers follow the project's SVG
 * conventions:
 *
 *   - Strokes and text use `currentColor`; recolor at the call site by setting
 *     a Tailwind text color on the wrapping `SvgFigure` (e.g. `text-primary`).
 *   - "Highlighted" regions are drawn with `fill="currentColor"
 *     fill-opacity="0.18"` so they remain readable in both light and dark
 *     themes without depending on hard-coded hex / `hsl(var(--*))` values
 *     (the project uses `oklch(...)` theme variables, so `hsl(var(--*))` does
 *     not resolve to the right color).
 *   - `stroke-width` is omitted unless a heavier line is genuinely required;
 *     SVG defaults to 1.
 *   - Output is a single line — no newlines inside the returned string — to
 *     match the convention used by the standalone `.svg` files under
 *     `src/data/<problems|knowledge>/figures/`.
 *
 * See `AGENTS.md` ("SVG Figures") for the underlying rules.
 */

type Cell = readonly [number, number];

type SeatingChartOptions = {
  /** Cells to highlight, as `[row, col]` (0-indexed). */
  highlight?: Cell[];
  /** Optional per-cell labels keyed by `"row,col"`. Defaults to a 1-based index. */
  labels?: Record<string, string>;
  /** Cell radius in user units. Defaults to 14. */
  size?: number;
  /** Gap between cells. Defaults to 6. */
  gap?: number;
};

/**
 * Generate a seating chart: `rows × cols` of circles. Suitable for排队 / 排座
 * / 排列 problems where the geometry of "where each person sits" matters.
 */
export function createSeatingChart(
  rows: number,
  cols: number,
  options?: SeatingChartOptions,
): string {
  const radius = options?.size ?? 14;
  const gap = options?.gap ?? 6;
  const step = radius * 2 + gap;
  const width = cols * step + gap;
  const height = rows * step + gap;

  const highlightSet = new Set(
    (options?.highlight ?? []).map(([r, c]) => `${r},${c}`),
  );

  const parts: string[] = [];
  parts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">`,
  );

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = gap + c * step + radius;
      const cy = gap + r * step + radius;
      const key = `${r},${c}`;
      const label = options?.labels?.[key] ?? `${r * cols + c + 1}`;
      const fill = highlightSet.has(key)
        ? `fill="currentColor" fill-opacity="0.18"`
        : `fill="none"`;
      parts.push(
        `<circle cx="${cx}" cy="${cy}" r="${radius}" ${fill} stroke="currentColor"/>`,
      );
      parts.push(
        `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central" fill="currentColor">${label}</text>`,
      );
    }
  }

  parts.push(`</svg>`);
  return parts.join("");
}

type MatrixDiagramOptions = {
  /** Highlight the main diagonal. */
  highlightDiagonal?: boolean;
  /** Cells to fill, as `[row, col]` (0-indexed). */
  highlightCells?: Cell[];
  /** Cell side length in user units. Defaults to 32. */
  cellSize?: number;
};

/**
 * Generate an `n × n` matrix grid with optional diagonal / cell highlights.
 * Useful for排列 / 组合 / 配对 problems where pairs `(i, j)` are enumerated.
 */
export function createMatrixDiagram(
  n: number,
  options?: MatrixDiagramOptions,
): string {
  const cell = options?.cellSize ?? 32;
  const size = n * cell;

  const highlightSet = new Set(
    (options?.highlightCells ?? []).map(([r, c]) => `${r},${c}`),
  );

  const parts: string[] = [];
  parts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">`,
  );

  // Highlighted cells are filled first so grid lines paint on top.
  for (const key of highlightSet) {
    const [r, c] = key.split(",").map(Number);
    const x = c * cell;
    const y = r * cell;
    parts.push(
      `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="currentColor" fill-opacity="0.18" stroke="none"/>`,
    );
  }

  // Grid lines.
  for (let i = 0; i <= n; i++) {
    const pos = i * cell;
    parts.push(
      `<line x1="${pos}" y1="0" x2="${pos}" y2="${size}" stroke="currentColor"/>`,
    );
    parts.push(
      `<line x1="0" y1="${pos}" x2="${size}" y2="${pos}" stroke="currentColor"/>`,
    );
  }

  if (options?.highlightDiagonal) {
    parts.push(
      `<line x1="0" y1="0" x2="${size}" y2="${size}" stroke="currentColor" stroke-width="1.5"/>`,
    );
  }

  parts.push(`</svg>`);
  return parts.join("");
}

type DecisionTreeOptions = {
  /** Node circle radius. Defaults to 18. */
  size?: number;
  /** Vertical distance between levels. Defaults to 80. */
  levelHeight?: number;
  /** Total SVG width. Defaults to 480. */
  width?: number;
};

/**
 * Generate a layered decision tree where every node at level `k` connects to
 * every node at level `k + 1`. Useful for枚举 / 排列 problems where the size
 * of the search space is the visualization itself (e.g. "3 衬衫 × 4 裤子").
 */
export function createDecisionTree(
  levels: string[][],
  options?: DecisionTreeOptions,
): string {
  const r = options?.size ?? 18;
  const levelH = options?.levelHeight ?? 80;
  const width = options?.width ?? 480;
  const height = (levels.length - 1) * levelH + r * 2 + 8;

  const positions = levels.map((items, level) => {
    const y = r + 4 + level * levelH;
    const spacing = width / (items.length + 1);
    return items.map((_, i) => ({ x: spacing * (i + 1), y }));
  });

  const parts: string[] = [];
  parts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">`,
  );

  // Connectors first so node circles paint on top.
  for (let level = 0; level < levels.length - 1; level++) {
    for (const parent of positions[level]) {
      for (const child of positions[level + 1]) {
        parts.push(
          `<line x1="${parent.x}" y1="${parent.y}" x2="${child.x}" y2="${child.y}" stroke="currentColor" stroke-opacity="0.4"/>`,
        );
      }
    }
  }

  for (let level = 0; level < levels.length; level++) {
    for (let i = 0; i < levels[level].length; i++) {
      const { x, y } = positions[level][i];
      parts.push(
        `<circle cx="${x}" cy="${y}" r="${r}" fill="currentColor" fill-opacity="0.08" stroke="currentColor"/>`,
      );
      parts.push(
        `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" fill="currentColor">${levels[level][i]}</text>`,
      );
    }
  }

  parts.push(`</svg>`);
  return parts.join("");
}

type BarChartDatum = {
  label: string;
  value: number;
};

type BarChartOptions = {
  /** Y-axis maximum. Defaults to `max(values)`. */
  maxValue?: number;
  /** Width of each bar. Defaults to 40. */
  barWidth?: number;
  /** Plot height (excluding label / axis padding). Defaults to 140. */
  plotHeight?: number;
};

/**
 * Lightweight vertical bar chart. Prefer the `compare-bars` scene kind for
 * inline comparisons; this helper exists for cases that genuinely need a
 * standalone SVG figure (e.g. embedding a chart inside a multi-figure layout).
 */
export function createBarChart(
  data: BarChartDatum[],
  options?: BarChartOptions,
): string {
  const values = data.map((d) => d.value);
  const max = options?.maxValue ?? Math.max(...values, 1);
  const barWidth = options?.barWidth ?? 40;
  const plotHeight = options?.plotHeight ?? 140;
  const gap = 12;
  const labelPadding = 18;
  const valuePadding = 14;
  const width = data.length * (barWidth + gap) + gap;
  const height = plotHeight + labelPadding + valuePadding;
  const baselineY = height - labelPadding;

  const parts: string[] = [];
  parts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">`,
  );
  parts.push(
    `<line x1="0" y1="${baselineY}" x2="${width}" y2="${baselineY}" stroke="currentColor" stroke-opacity="0.4"/>`,
  );

  for (let i = 0; i < data.length; i++) {
    const x = gap + i * (barWidth + gap);
    const barHeight = (data[i].value / max) * plotHeight;
    const y = baselineY - barHeight;
    parts.push(
      `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="currentColor" fill-opacity="0.5" stroke="currentColor"/>`,
    );
    parts.push(
      `<text x="${x + barWidth / 2}" y="${baselineY + 13}" text-anchor="middle" fill="currentColor">${data[i].label}</text>`,
    );
    parts.push(
      `<text x="${x + barWidth / 2}" y="${y - 4}" text-anchor="middle" fill="currentColor">${data[i].value}</text>`,
    );
  }

  parts.push(`</svg>`);
  return parts.join("");
}

type VennDiagramOptions = {
  /** Circle radius. Defaults to 56. */
  radius?: number;
  /** Horizontal overlap between the two circles. Defaults to `radius`. */
  overlap?: number;
};

/**
 * Two-set Venn diagram with counts in each region. Useful for集合 / 容斥
 * problems with two attributes.
 */
export function createVennDiagram(
  leftLabel: string,
  rightLabel: string,
  leftOnly: number | string,
  intersection: number | string,
  rightOnly: number | string,
  options?: VennDiagramOptions,
): string {
  const r = options?.radius ?? 56;
  const overlap = options?.overlap ?? r;
  const centerGap = r * 2 - overlap;
  const padding = 24;
  const width = r * 2 + centerGap + padding * 2;
  const height = r * 2 + padding * 2 + 16;
  const leftCx = padding + r;
  const rightCx = leftCx + centerGap;
  const cy = padding + r;
  const intersectionCx = (leftCx + rightCx) / 2;

  const parts: string[] = [];
  parts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">`,
  );
  parts.push(
    `<circle cx="${leftCx}" cy="${cy}" r="${r}" fill="currentColor" fill-opacity="0.08" stroke="currentColor"/>`,
  );
  parts.push(
    `<circle cx="${rightCx}" cy="${cy}" r="${r}" fill="currentColor" fill-opacity="0.08" stroke="currentColor"/>`,
  );

  // Region counts. The visual centers of the left-only and right-only crescents
  // are `r` away from the intersection center, regardless of `overlap`.
  const leftCenterX = intersectionCx - r;
  const rightCenterX = intersectionCx + r;
  parts.push(
    `<text x="${leftCenterX}" y="${cy}" text-anchor="middle" dominant-baseline="central" fill="currentColor">${leftOnly}</text>`,
  );
  parts.push(
    `<text x="${intersectionCx}" y="${cy}" text-anchor="middle" dominant-baseline="central" fill="currentColor">${intersection}</text>`,
  );
  parts.push(
    `<text x="${rightCenterX}" y="${cy}" text-anchor="middle" dominant-baseline="central" fill="currentColor">${rightOnly}</text>`,
  );

  // Set labels.
  parts.push(
    `<text x="${leftCx - r * 0.6}" y="${cy - r - 6}" text-anchor="middle" fill="currentColor">${leftLabel}</text>`,
  );
  parts.push(
    `<text x="${rightCx + r * 0.6}" y="${cy - r - 6}" text-anchor="middle" fill="currentColor">${rightLabel}</text>`,
  );

  parts.push(`</svg>`);
  return parts.join("");
}
