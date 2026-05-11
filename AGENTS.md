# Agent Rules

## File Naming (`src/components`)

- Name each file in `src/components` (including subdirectories like `ui/` and `visuals/`) as the kebab-case form of its primary exported component, e.g. `page-header.tsx` → `PageHeader`, `button.tsx` → `Button`.
- One primary component per file; related helpers/subcomponents may be co-exported (e.g. `Card` + `CardHeader`) when they share the same primitive.
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
- Prefer official shadcn/ui components over hand-rolled equivalents. Before building a UI pattern from scratch (carousel, dialog, dropdown, tooltip, tabs, command palette, etc.), check the shadcn registry and install the primitive via `pnpm dlx shadcn@latest add <component>`. Only fall back to a custom implementation when no shadcn component fits, and document the reason in the file.
- For `Card`, prefer semantic composition with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter` instead of placing all content directly under `Card`.
- Keep interactive controls accessible (`type`, `aria-*`, labels/associations where needed).
- Use component props (`variant`, `size`, `asChild`) before introducing custom class overrides. When a design calls for a visual that no existing variant covers (e.g. a chip), pass a minimal `className` override on top of the closest variant (typically `ghost`) rather than falling back to a raw `<button>`.
- **Occam's Razor for shadcn components**: When using a shadcn primitive, trust its built-in styling and behavior. Do not add unnecessary `className` overrides, wrapper `<div>`s, or redundant props that replicate the component's defaults (e.g. re-specifying padding/rounding/border that the variant already provides, wrapping a `Button` in a styled `<div>` purely for layout a `flex` utility on the parent would handle, or overriding typography on `CardTitle`/`CardDescription` to match what they already render). Only add overrides when the design genuinely diverges from the default; otherwise let the primitive speak for itself.

## Problem Solutions (`src/data/problems/*.ts`)

- **Difficulty alignment**: Problems must revolve around the elementary school Olympiad system (小学奥数体系). Do not create problems that are too advanced (beyond elementary curriculum) or too simple (below Olympiad level). Ensure appropriate challenge for the target grade level.
- Keep `solutions[].steps` concise and non-redundant: do not duplicate content between `分析`, subsequent `steps`, and `scenes` (e.g. `equation-list` rows). See `/optimize-problem` and `/generate-problem` workflows for the detailed rubric.
- **Step text and scene complementarity**: `step.text` should carry the narrative (insights, strategies, reasoning logic), while `scenes` should carry the visualization (specific calculations, graphics, comparisons). They should complement each other, not repeat. For example, if a scene's `equation-list` already shows the full derivation row by row, the step text should describe the strategy or insight behind that derivation, not restate the equations in prose form.
- In particular, if a `scenes` entry (typically `equation-list`) already walks through the full derivation row by row, do NOT add a `step` whose sole purpose is to restate that derivation as a single equation chain. Let the analysis step carry the narrative and the scene carry the computation.
- Readability of each `step`: keep every single `steps[]` entry short and skimmable — prefer 1–2 short sentences per step; do not cram multiple logically distinct moves (e.g. 分组 + 组内排序 + 合并顺序 + 结论) into one long run-on sentence separated by 分号/逗号. If a step would otherwise become a wall of text, split it into several short steps, push the mechanical derivation into a `scenes` entry (e.g. `equation-list`), or move list-like enumerations into structured scene rows. A useful heuristic: if a step wraps to more than ~2 lines on a typical reading column, it should be split or off-loaded to a scene.
- **Step compactness**: For simple arithmetic or formula-based problems, avoid over-granular steps. Do not split each arithmetic operation (e.g., "先算 A = B"，"再算 C = D"，"所以 E = F") into separate steps. Instead, combine related calculations into a single compact step that shows the complete derivation chain (e.g., "A × B = (拆分) = C × D = E" or "公式代入：C(n,k) = n!/(k!(n−k)!) = 计算结果"). The goal is 2–4 steps per solution: analysis (if complex) + 1–2 derivation steps + optional conclusion.
- **Avoid inter-step redundancy**: Do not repeat information that was already established in previous steps. If step 1 (分析) already stated a fact (e.g., "从 A 到 B 跨越 3 个单位"), subsequent steps should build on that fact without restating it. Each step should contribute new information or advance the reasoning, not recapitulate what was already said.
- **Occam's Razor**: For very simple problems (e.g., direct formula application or single-step arithmetic), prefer a single step that directly shows the calculation without explanatory preamble. If the calculation is self-evident from the problem statement, no "观察" or "分析" preamble is needed. Example: For "计算：125 × 32" with凑整法, the step can simply be "125 × 32 = 125 × (4 × 8) = (125 × 8) × 4 = 1000 × 4 = 4000" without first explaining "125 × 8 = 1000 is a round number".
- **Do not add unnecessary verification steps**: Solutions should present only the core reasoning process; do not add extra steps like "验证：xxx ✓". If verification has pedagogical value, present it through `scenes` (e.g., SVG short division) rather than as a text step.
- **Avoid redundant alternative solutions**: For simple arithmetic or formula-based problems, do not include multiple alternative solutions (e.g., both 凑整法 and 乘法分配律 for the same calculation). One primary solution is sufficient; alternative solutions are only valuable when they offer genuinely different conceptual insights, not just different arithmetic paths to the same result.
- **Keep scenes minimal and focused**: Each `scenes` entry should serve a distinct pedagogical purpose. Remove redundant or decorative scenes (e.g., `compare-bars` or `result-badges` that merely restate what the equation-list already shows). Prefer a single core scene (typically `equation-list`) that clearly demonstrates the reasoning; additional scenes should only be added when they provide complementary visualizations that enhance understanding.
- **Avoid scene redundancy**: Do not add scenes that repeat information already shown in other scenes. For example, if a `number-line` already displays the final answer with clear labels (e.g., "现在儿子: 28", "现在父亲: 53"), do not add a `result-badges` scene that repeats the same information. Each scene should provide new visual perspective or information not already conveyed.
- **Simplify equation-list lhs**: In `equation-list` scenes, avoid repeating the full arithmetic expression in the `lhs` column. Use "原式" for the first row and empty strings for subsequent rows to focus attention on the transformation steps. Example: instead of `{"lhs": "125 × 32 (拆分 32)", "rhs": "125 × (4 × 8)"}`, use `{"lhs": "原式", "rhs": "125 × (4 × 8)"}`.
- **`tags` is the single source of truth for methods**: Every problem declares `tags: string[]` (0–3 entries) drawn from the `src/lib/tags.ts` whitelist. `tags` drives both the homepage filter and the per-problem 方法 section: the problem page renders a link to `/k/:slug` for every tag whose corresponding `KnowledgeEntry` has a matching `tag` field. Only include methods that are actually used in the solutions; do not include alternative methods that are not presented. If a method has no knowledge page yet and the tag genuinely fits, author the knowledge page first (set its `tag` field to the same string) so the link resolves. If no method genuinely fits, write `tags: []` rather than inventing one.

## Text Content (Problems & Knowledge)

- Can use Markdown syntax in any text fields of `src/data/problems/*.ts` or `src/data/knowledge/*.ts` (e.g. problem `stem`/`question`, solution `分析`/`step` text, knowledge `content`, descriptions).
- For math, use Unicode characters and symbols (e.g. ×, ÷, ², ₁, ₂, −) as already used in existing data files. Do not use LaTeX, or KaTeX.

## Question Formatting (`src/data/problems/*.ts`)

- Add line breaks (`\n`) to the `question` field to improve readability:
  - Separate conditions/descriptions from the main question
  - Separate multiple questions when the problem asks more than one thing
  - Example: `"条件描述。\n主问题？"` or `"条件描述。\n第一个问题？\n第二个问题？"`

## Scene Labels (`compare-bars`, `equation-list`, etc.)

- Keep `rows[].label` strings short, unambiguous, and free of notation that collides with arithmetic. In particular, do NOT use `×` to mean "repeated count of" (e.g. `5×4` to mean "five 4s"), because it reads as the product `5 × 4 = 20`. Prefer Chinese quantity phrasing like `5 个 4`, `10 个 2`, `6 个 3 + 1 个 2`.
- Do not pack the derived value into the label (e.g. `"5×4 (4⁵)"`). The bar's right-hand `value` column already shows the numeric result; the label should name the case, not restate the computation.
- When comparing cases of the same structure, keep label grammar parallel across rows so the eye can scan them as a list.
- `result-badges` is for "count of items" (e.g. `🐔 × 30`): its default layout inserts a literal `×` between `icon` and `count`. Therefore (1) do not use it to display a derived value such as a product, sum, or final answer — prefer `equation-list` (optionally with `badge`) for those; and (2) never pass a `×`-like glyph (`✖️`, `×`, `✕`, `⨯`) as `icon`, or you will render two adjacent multiplication signs.

## SVG Figures

- Keep SVG figures minimal: only include geometry essential to the concept; avoid decorative elements, gradients, and extraneous labels.
- Do not restate the problem statement inside the figure. This applies to both geometry annotations (e.g. `BC = 5BD`, `AE : EC = 3 : 1`, `DG = GS = SE`) and non-geometry parameters (e.g. `共 3 张饼`, `每面 3 分钟`, `最多放 2 张`, `速度 60 km/h`). All such counts, ratios, times, capacities, and constraints belong in the problem `question`, not as inline `<text>` labels on the drawing. The figure should show the scenario (shape, apparatus, configuration); the text fields carry the numbers.
- Verify coordinate correctness before saving a figure: every labeled point must actually lie on its defining locus with the stated ratio. For a point `P` on segment `XY` with `XP : PY = m : n`, compute `P = X + m/(m+n) · (Y − X)` exactly; do not eyeball positions. A small arithmetic check (e.g. confirm `P` satisfies the line equation of `XY`) prevents figures where a point appears off its segment or where downstream constructions inherit a wrong coordinate.
- Support dark mode: do not hard-code colors like `#000` or `black`/`white`. Use `currentColor` (or theme-aware CSS classes/variables) so strokes and fills adapt to light/dark themes.
- Do not place `currentColor` (or any theme-aware) text on top of hard-coded background fills (e.g. pastel `#e8f4f8`, `#fdedec`). In dark mode the text color flips but the fixed background does not, making the text unreadable. Prefer `class="fill-none"` for container rects and let `currentColor` strokes/text carry the meaning; if a subtle background is genuinely needed, use a low-opacity `currentColor` fill (e.g. `class="fill-current/10"`) or a theme-aware CSS variable.
- Avoid arbitrary brand-palette hex colors (e.g. `#2980b9`, `#e74c3c`, `#27ae60`) for strokes or text accents. Use `currentColor` for the default ink; reserve differentiated colors for cases where categorical distinction is essential, and then use semantic CSS variables or low-opacity `currentColor` variants that remain legible in both themes.
- Prefer the default `stroke-width` of `1`; do not specify `stroke-width` unless the design genuinely requires a different value.
- **Use Tailwind CSS classes for styling**: Prefer `class="stroke-current fill-none"` over inline `stroke="currentColor" fill="none"`. Use `class="fill-current"` instead of `fill="currentColor"`. For color highlighting, use Tailwind classes like `class="fill-current/10 stroke-current"`.
- **Replace inline RGB/hex colors with Tailwind classes**: Do not use inline color attributes like `fill="rgb(241 196 15 / 0.30)"` or `stroke="#B7950B"`. Replace them with Tailwind classes (e.g., `fill-primary/10 stroke-primary`) to ensure theme-aware styling and consistency.
- **Rotational symmetry with Tailwind classes**: For center-symmetric or rotationally repeated patterns, use nested `<g>` elements with Tailwind utility classes instead of recalculating coordinates. Define the base shape once, then nest it with `rotate-90 origin-center` (or other angles) to create cumulative rotations. Example: 4-fold symmetry uses 3 nested levels of `rotate-90 origin-center`. This pattern is extensible—change the rotation angle for different repetition counts (e.g., `rotate-120` for 3-fold symmetry).
- **Layering and grouping**: Separate line elements (polygon, line, path, circle outlines) and marker points into different `<g>` groups. Line group uses `class="stroke-current fill-none"`, marker/content group uses `class="fill-current"`.
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
