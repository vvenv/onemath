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

- **Difficulty alignment**: Problems must revolve around the elementary school Olympiad system (小学奥数体系). Do not create problems that are too advanced (beyond elementary curriculum) or too simple (below Olympiad level). Ensure appropriate challenge for the target grade level.
- Keep `solutions[].steps` concise and non-redundant: do not duplicate content between `分析`, subsequent `steps`, and `scenes` (e.g. `equation-list` rows). See `/optimize-problem` and `/generate-problem` workflows for the detailed rubric.
- In particular, if a `scenes` entry (typically `equation-list`) already walks through the full derivation row by row, do NOT add a `step` whose sole purpose is to restate that derivation as a single equation chain. Let the analysis step carry the narrative and the scene carry the computation.
- Readability of each `step`: keep every single `steps[]` entry short and skimmable — prefer 1–2 short sentences per step; do not cram multiple logically distinct moves (e.g. 分组 + 组内排序 + 合并顺序 + 结论) into one long run-on sentence separated by 分号/逗号. If a step would otherwise become a wall of text, split it into several short steps, push the mechanical derivation into a `scenes` entry (e.g. `equation-list`), or move list-like enumerations into structured scene rows. A useful heuristic: if a step wraps to more than ~2 lines on a typical reading column, it should be split or off-loaded to a scene.
- **Step compactness**: For simple arithmetic or formula-based problems, avoid over-granular steps. Do not split each arithmetic operation (e.g., "先算 A = B"，"再算 C = D"，"所以 E = F") into separate steps. Instead, combine related calculations into a single compact step that shows the complete derivation chain (e.g., "A × B = (拆分) = C × D = E" or "公式代入：C(n,k) = n!/(k!(n−k)!) = 计算结果"). The goal is 2–4 steps per solution: analysis (if complex) + 1–2 derivation steps + optional conclusion.
- **Occam's Razor**: For very simple problems (e.g., direct formula application or single-step arithmetic), prefer a single step that directly shows the calculation without explanatory preamble. If the calculation is self-evident from the problem statement, no "观察" or "分析" preamble is needed. Example: For "计算：125 × 32" with凑整法, the step can simply be "125 × 32 = 125 × (4 × 8) = (125 × 8) × 4 = 1000 × 4 = 4000" without first explaining "125 × 8 = 1000 is a round number".
- **Do not add unnecessary verification steps**: Solutions should present only the core reasoning process; do not add extra steps like "验证：xxx ✓". If verification has pedagogical value, present it through `scenes` (e.g., SVG short division) rather than as a text step.
- **`knowledgePoints` is required**: Every problem must declare a `knowledgePoints: KnowledgePoint[]` field (each entry has `slug`, `name`, optional `summary`). The `slug` must point to an authored `src/data/knowledge/<slug>.ts` page; if you need a method that has no knowledge page yet, author the page first. If no method genuinely fits, write `knowledgePoints: []` rather than inventing a slug.
- **`tags` vs `knowledgePoints`**: `tags` is a coarse vocabulary (must come from `src/lib/tags.ts` whitelist) used for filtering/listing; `knowledgePoints` is what powers the per-problem 知识点 section and links to method explainer pages. Keep them aligned: every method tag should normally also appear in `knowledgePoints`, but `knowledgePoints` may include slugs that aren't method tags (e.g. probability sub-topics).

## Text Content (Problems & Knowledge)

- Do NOT use Markdown syntax in any text fields of `src/data/problems/*.ts` or `src/data/knowledge/*.ts` (e.g. problem `stem`/`question`, solution `分析`/`step` text, knowledge `content`, captions, descriptions). The renderer displays these as plain text and does not parse Markdown.
- Specifically avoid: `**bold**`, `*italic*`, `_emphasis_`, `` `code` ``, `#`/`##` headings, `-`/`*`/`1.` list markers, `[text](url)` links, `> ` blockquotes, and fenced code blocks.
- For math, use Unicode characters and symbols (e.g. ×, ÷, ², ₁, ₂, −) as already used in existing data files. Do not use LaTeX, KaTeX, or Markdown syntax — the renderer displays text as plain text. For emphasis, rely on sentence structure and scene composition instead of inline formatting.

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
- **Use Tailwind CSS classes for styling**: Prefer `class="stroke-current fill-none"` over inline `stroke="currentColor" fill="none"`. Use `class="fill-current"` instead of `fill="currentColor"`. For color highlighting, use Tailwind classes like `class="fill-current/10 stroke-current"`.
- **Replace inline RGB/hex colors with Tailwind classes**: Do not use inline color attributes like `fill="rgb(241 196 15 / 0.30)"` or `stroke="#B7950B"`. Replace them with Tailwind classes (e.g., `fill-amber-500/10 stroke-amber-500`) to ensure theme-aware styling and consistency.
- **Rotational symmetry with Tailwind classes**: For center-symmetric or rotationally repeated patterns, use nested `<g>` elements with Tailwind utility classes instead of recalculating coordinates. Define the base shape once, then nest it with `rotate-90 origin-center` (or other angles) to create cumulative rotations. Example: 4-fold symmetry uses 3 nested levels of `rotate-90 origin-center`. This pattern is extensible—change the rotation angle for different repetition counts (e.g., `rotate-120` for 3-fold symmetry).
- **Layering and grouping**: Separate line elements (polygon, line, path, circle outlines) and marker points into different `<g>` groups. Line group uses `class="stroke-current fill-none"`, marker/content group uses `class="fill-current"`. For markers without text labels, use solid circles with `class="fill-current"`. For markers with text labels, use semi-transparent fill (e.g., `fill="currentColor" fill-opacity="0.12"` or Tailwind `fill-current/10`) with fully opaque text on top.
- **Merge adjacent groups with identical attributes**: Do not create multiple adjacent `<g>` elements with the same attributes (e.g., `class` and `text-anchor`). Merge them into a single `<g>` to keep the SVG structure clean and avoid redundancy.
- **Promote common class attributes to parent `<g>`**: When multiple child elements within a group share identical `class` attributes, move the common classes to the parent `<g>` to avoid repetition. For example, instead of `<g><path class="fill-current/10 stroke-current"/><path class="fill-current/10 stroke-current"/></g>`, use `<g class="fill-current/10 stroke-current"><path/><path/></g>`.
- **Nest groups to inherit shared attributes**: When a subset of children needs an extra attribute (e.g. `text-anchor="middle"` on text labels) while still sharing the parent's styling (e.g. `class="fill-current"`), nest a child `<g>` carrying only the additional attribute inside the parent rather than duplicating the parent's class. For example, marker dots and their text labels can live under one `<g class="fill-current">`, with the text labels grouped in an inner `<g text-anchor="middle">` that inherits `fill-current` from the parent. Do not repeat `class="fill-current"` on the inner group.
- **Text alignment**: Use `text-anchor="middle"` attribute for center-aligned text labels.
- **Do not set non-essential attributes on the SVG root or children**: Keep SVG minimal and inherit styling from page context. Specifically, do NOT add `font-size`, explicit `width`/`height`, `font-family`, `color`, or other hard-coded styling on the `<svg>` root unless the design genuinely requires a non-default value. Required attributes are limited to `viewBox`, `xmlns`, and (optionally) a `class` carrying theme-aware utilities like `stroke-current fill-none`. The same minimality applies to child elements: omit attributes whose values match the default or the inherited value.
- **Remove unnecessary <g> wrappers**: If a `<g>` only contains a single element, remove the wrapper and apply classes directly to the element. Keep grouping only when it serves a semantic purpose (e.g., separating lines from markers).
- **Format and readability**: For `.svg` files in `src/data/<problems|knowledge>/figures/`, use multi-line indented format with one element per line for easier diff and manual editing. Only avoid meaningless newlines inside `d` attributes or inline SVG strings.
- Store figure SVGs as separate `.svg` files colocated under `src/data/<problems|knowledge>/figures/`, not as inline string literals inside the TS data files. Import the raw markup via Vite's `?raw` suffix (e.g. `import svg1 from "./figures/10055-1.svg?raw";`) and reference the identifier from the `figures[].svg` / `scenes[].svg` fields.
- Naming convention: `<file-stem>-<n>.svg` for problem/knowledge data files (e.g. `10055-1.svg`), or a descriptive slug when the figure has a stable name (e.g. `bird-head-model.svg`).
- **ViewBox standardization**: Use consistent viewBox sizing with 20px bleed on all sides. Preserve aspect ratios based on content shape. Recommended standard sizes:
  - Square: content 400x400 → viewBox "0 0 440 440"
  - Horizontal: content 400x240 → viewBox "0 0 440 280"
  - Strip: content 400x80 → viewBox "0 0 440 120"
  - Vertical: content 240x400 → viewBox "0 0 280 440"
    Adjust content coordinates to center within the effective content area (e.g., for 440x440 viewBox, center content at x=20, y=20 with width=400, height=400).
