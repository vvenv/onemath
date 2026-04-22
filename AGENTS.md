# Agent Rules

## File Naming (`src/components`)

- Name each file in `src/components` (including subdirectories like `ui/` and `visuals/`) as the kebab-case form of its primary exported component, e.g. `page-header.tsx` → `PageHeader`, `button.tsx` → `Button`.
- One primary component per file; related helpers/subcomponents may be co-exported (e.g. `Card` + `CardHeader`, `Scene` + `Caption`) when they share the same primitive.
- Barrel files are named `index.ts` and only re-export.

## UI Components (`src/components/ui`)

- Treat files under `src/components/ui` as shadcn/ui primitives.
- Keep component APIs aligned with shadcn defaults unless the user explicitly requests divergence.
- Preserve shadcn patterns: `forwardRef`, `displayName`, `cn` utility, Radix `asChild`/`Slot` composition, and `cva` variants where applicable.
- Prefer extending variants and classes over changing primitive structure.

## Pages (`src/pages`)

- Files in `src/pages` must only define route-level components (default export = the page). Do not co-export shared helpers, data accessors, constants, or hooks from a page module.
- Shared data access (e.g. loading `src/data/*.json`, lookup helpers like `getProblemById`) belongs in `src/lib/*`. Import from `@/lib/*` in pages, layouts, and components.
- Do not re-load the same dataset in multiple modules; import the single shared accessor from `@/lib/*`.

## Using UI Primitives

- Import from `@/components/ui/*`; avoid ad-hoc duplicate wrappers.
- Outside of `src/components/ui/`, do not use raw HTML primitives when a shadcn counterpart exists. Always use `Button` from `@/components/ui/button` instead of `<button>`, `Input` instead of `<input>`, `Badge` for pill-like tags, `Card` (with its subcomponents) for card surfaces, etc. For links, use React Router `Link` or `Button` with `asChild` wrapping a `Link`.
- For `Card`, prefer semantic composition with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter` instead of placing all content directly under `Card`.
- Keep interactive controls accessible (`type`, `aria-*`, labels/associations where needed).
- Use component props (`variant`, `size`, `asChild`) before introducing custom class overrides. When a design calls for a visual that no existing variant covers (e.g. a chip), pass a minimal `className` override on top of the closest variant (typically `ghost`) rather than falling back to a raw `<button>`.

## Problem Solutions (`src/data/problems/*.ts`)

- Keep `solutions[].steps` concise and non-redundant: do not duplicate content between `分析`, subsequent `steps`, and `scenes` (e.g. `equation-list` rows). See `/optimize-problem` and `/generate-problem` workflows for the detailed rubric.
- In particular, if a `scenes` entry (typically `equation-list`) already walks through the full derivation row by row, do NOT add a `step` whose sole purpose is to restate that derivation as a single equation chain. Let the analysis step carry the narrative and the scene carry the computation.
- Readability of each `step`: keep every single `steps[]` entry short and skimmable — prefer 1–2 short sentences per step; do not cram multiple logically distinct moves (e.g. 分组 + 组内排序 + 合并顺序 + 结论) into one long run-on sentence separated by 分号/逗号. If a step would otherwise become a wall of text, split it into several short steps, push the mechanical derivation into a `scenes` entry (e.g. `equation-list`), or move list-like enumerations into structured scene rows. A useful heuristic: if a step wraps to more than ~2 lines on a typical reading column, it should be split or off-loaded to a scene.

## Text Content (Problems & Knowledge)

- Do NOT use Markdown syntax in any text fields of `src/data/problems/*.ts` or `src/data/knowledge/*.ts` (e.g. problem `stem`/`question`, solution `分析`/`step` text, knowledge `content`, captions, descriptions). The renderer displays these as plain text and does not parse Markdown.
- Specifically avoid: `**bold**`, `*italic*`, `_emphasis_`, `` `code` ``, `#`/`##` headings, `-`/`*`/`1.` list markers, `[text](url)` links, `> ` blockquotes, and fenced code blocks.
- For math, use the project's LaTeX/KaTeX delimiters (as already used in existing data files) rather than Markdown. For emphasis, rely on sentence structure and scene composition instead of inline formatting.

## Scene Labels (`compare-bars`, `equation-list`, etc.)

- Keep `rows[].label` strings short, unambiguous, and free of notation that collides with arithmetic. In particular, do NOT use `×` to mean "repeated count of" (e.g. `5×4` to mean "five 4s"), because it reads as the product `5 × 4 = 20`. Prefer Chinese quantity phrasing like `5 个 4`, `10 个 2`, `6 个 3 + 1 个 2`.
- Do not pack the derived value into the label (e.g. `"5×4 (4⁵)"`). The bar's right-hand `value` column already shows the numeric result; the label should name the case, not restate the computation.
- When comparing cases of the same structure, keep label grammar parallel across rows so the eye can scan them as a list.
- `result-badges` is for "count of items" (e.g. `🐔 × 30`): its default layout inserts a literal `×` between `icon` and `count`. Therefore (1) do not use it to display a derived value such as a product, sum, or final answer — prefer `equation-list` (optionally with `badge`) for those; and (2) never pass a `×`-like glyph (`✖️`, `×`, `✕`, `⨯`) as `icon`, or you will render two adjacent multiplication signs.

## SVG Figures

- Keep SVG figures minimal: only include geometry essential to the concept; avoid decorative elements, gradients, and extraneous labels.
- Do not restate the problem statement inside the figure. This applies to both geometry annotations (e.g. `BC = 5BD`, `AE : EC = 3 : 1`, `DG = GS = SE`) and non-geometry parameters (e.g. `共 3 张饼`, `每面 3 分钟`, `最多放 2 张`, `速度 60 km/h`). All such counts, ratios, times, capacities, and constraints belong in the problem `question` or the figure's `caption`, not as inline `<text>` labels on the drawing. The figure should show the scenario (shape, apparatus, configuration); the text fields carry the numbers.
- Verify coordinate correctness before saving a figure: every labeled point must actually lie on its defining locus with the stated ratio. For a point `P` on segment `XY` with `XP : PY = m : n`, compute `P = X + m/(m+n) · (Y − X)` exactly; do not eyeball positions. A small arithmetic check (e.g. confirm `P` satisfies the line equation of `XY`) prevents figures where a point appears off its segment or where downstream constructions inherit a wrong coordinate.
- Support dark mode: do not hard-code colors like `#000` or `black`/`white`. Use `currentColor` (or theme-aware CSS classes/variables) so strokes and fills adapt to light/dark themes.
- Do not place `currentColor` (or any theme-aware) text on top of hard-coded background fills (e.g. pastel `#e8f4f8`, `#fdedec`). In dark mode the text color flips but the fixed background does not, making the text unreadable. Prefer `fill="none"` for container rects and let `currentColor` strokes/text carry the meaning; if a subtle background is genuinely needed, use a low-opacity `currentColor` fill (e.g. `fill="currentColor" fill-opacity="0.06"`) or a theme-aware CSS variable.
- Avoid arbitrary brand-palette hex colors (e.g. `#2980b9`, `#e74c3c`, `#27ae60`) for strokes or text accents. Use `currentColor` for the default ink; reserve differentiated colors for cases where categorical distinction is essential, and then use semantic CSS variables or low-opacity `currentColor` variants that remain legible in both themes.
- Prefer the default `stroke-width` of `1`; do not specify `stroke-width` unless the design genuinely requires a different value.
- Do not include newline characters inside SVG source (including inside `d` attributes or between elements in inline SVG strings); keep the SVG on a single line.
- Store figure SVGs as separate `.svg` files colocated under `src/data/<problems|knowledge>/figures/`, not as inline string literals inside the TS data files. Import the raw markup via Vite's `?raw` suffix (e.g. `import svg1 from "./figures/10055-1.svg?raw";`) and reference the identifier from the `figures[].svg` / `scenes[].svg` fields.
- Naming convention: `<file-stem>-<n>.svg` for problem/knowledge data files (e.g. `10055-1.svg`), or a descriptive slug when the figure has a stable name (e.g. `bird-head-model.svg`).
