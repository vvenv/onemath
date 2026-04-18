# Testing Theme Persistence (onemath)

## Overview
The site uses localStorage-based theme persistence with an inline `<head>` script for FOUC prevention. React hydration can strip uncontrolled DOM attributes (like the `dark` class on `<html>`), so a `useEffect` in the root Layout re-applies the stored theme after hydration.

## Key Files
- `src/lib/theme.ts` — theme logic, `getInitialTheme()`, `applyStoredTheme()`, inline `themeScript`
- `src/root.tsx` — root Layout with `useEffect(() => applyStoredTheme(), [])`
- `src/components/theme-switcher.tsx` — UI for switching light/dark mode and color schemes

## How to Access Theme Switcher
1. Look for the palette icon in the top-right of the app bar (header area)
2. Click it to open a Sheet panel with:
   - "亮色" (light) / "暗色" (dark) mode toggle buttons at top
   - Color scheme options below (默认, 沉浸阅读, 复古纸质, etc.)
   - Custom color section at bottom

## Test Procedure: Theme Persistence
1. Navigate to the target page (homepage `/` or a problem page `/p/<id>`)
2. Open theme switcher → click "暗色" to enable dark mode
3. Verify dark mode is active (dark background, light text)
4. Close the theme panel
5. Refresh the page (F5)
6. **Assert**: Page remains in dark mode after refresh — no revert to light mode
7. Repeat for light mode switch-back to verify bidirectional persistence

## What to Check
- `<html>` element has class `dark` when dark mode is active
- `data-color-scheme` attribute on `<html>` matches the selected scheme
- No visible flash of light mode before dark mode kicks in (FOUC)
- Theme persists across different pages (homepage, problem pages)

## Known Gotchas
- **React hydration stripping attributes**: React 19 hydration reconciliation removes DOM attributes not controlled by React props. If `<html>` doesn't have a `className` prop, any class set by an inline script will be removed during hydration. The fix is to re-apply from `useEffect`.
- **Vercel preview URLs**: Preview deployments may have long URLs like `onemath-git-<branch>-<hash>-vvenv-projects.vercel.app`. Use the preview URL from the PR's Vercel bot comment.
- **No login required**: The site is public; no authentication needed for testing.

## Environment
- Build: `pnpm build` then `pnpm preview` (Vite, port 4173) for local testing
- Or use Vercel preview deployment from PR
- No secrets needed for basic theme testing
