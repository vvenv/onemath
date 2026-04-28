# Development & Testing

## Local Setup

```bash
pnpm install
```

## Commands

| Command | Purpose |
|---|---|
| `pnpm run build` | Full production build (SSG + Vercel BOA) |
| `pnpm run typecheck` | Run `react-router typegen && tsc -b` |
| `pnpm dev` | Start Vite dev server |

## Build Architecture

React Router v7 runs **two build passes** (SSR + client-with-prerender). Any value in `vite.config.ts` that uses `Date.now()` or other non-deterministic expressions will differ between passes, causing hydration mismatches. Use stable values (e.g., git commit hash) for `define` constants that affect rendered output.

## Testing SSG Hydration Consistency

To verify that SSG HTML and client hydration produce the same output:

1. **curl the page** (no JS execution) to extract content from the prerendered HTML
2. **Open the same URL in Chrome** and inspect the rendered DOM after hydration
3. **Compare**: if the content differs, there's a hydration mismatch

Example for the featured problem on the homepage:
```bash
# Extract featured problem ID from SSG HTML
curl -s https://edao.plus/ | python3 -c "
import sys, re
html = sys.stdin.read()
links = re.findall(r'href=\"/p/(\d+)\"', html)
print('First /p/ link (featured):', links[0] if links else 'none')
"
```
Then compare with what the browser renders after React hydration.

## Deployment

- **Production**: edao.plus (Vercel)
- **Preview**: Vercel auto-deploys preview URLs for each PR branch
- Preview URL pattern: `onemath-git-<branch>-vvenv-projects.vercel.app`
