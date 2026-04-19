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

## SVG Figures

- Keep SVG figures minimal: only include geometry essential to the concept; avoid decorative elements, gradients, and extraneous labels.
- Support dark mode: do not hard-code colors like `#000` or `black`/`white`. Use `currentColor` (or theme-aware CSS classes/variables) so strokes and fills adapt to light/dark themes.
- Prefer the default `stroke-width` of `1`; do not specify `stroke-width` unless the design genuinely requires a different value.
- Do not include newline characters inside SVG source (including inside `d` attributes or between elements in inline SVG strings); keep the SVG on a single line.
- Store figure SVGs as separate `.svg` files colocated under `src/data/<problems|knowledge>/figures/`, not as inline string literals inside the TS data files. Import the raw markup via Vite's `?raw` suffix (e.g. `import svg1 from "./figures/10055-1.svg?raw";`) and reference the identifier from the `figures[].svg` / `scenes[].svg` fields.
- Naming convention: `<file-stem>-<n>.svg` for problem/knowledge data files (e.g. `10055-1.svg`), or a descriptive slug when the figure has a stable name (e.g. `bird-head-model.svg`).
