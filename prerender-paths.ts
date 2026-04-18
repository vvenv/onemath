import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

/**
 * Compute the list of routes that should be prerendered at build time.
 *
 * The same list is consumed by `react-router.config.ts` (for RR's prerender
 * step) and by `vite.config.ts` (to seed the Service Worker precache manifest
 * with every route's `index.html`). Keeping them in sync prevents the SW from
 * missing a prerendered route, which would force it to fall back to the SPA
 * shell HTML and lose per-route meta / first-paint content.
 */
export function getPrerenderPaths(): string[] {
  const problemsDir = path.resolve(here, "./src/data/problems");
  const knowledgeDir = path.resolve(here, "./src/data/knowledge");

  const problemIds = readdirSync(problemsDir)
    .filter((name) => name.endsWith(".ts"))
    .map((name) => name.replace(/\.ts$/, ""))
    .sort();

  const knowledgeSlugs = readdirSync(knowledgeDir)
    .filter((name) => name.endsWith(".ts") && name !== "types.ts")
    .flatMap((name) =>
      Array.from(
        readFileSync(path.join(knowledgeDir, name), "utf-8").matchAll(
          /^\s*slug:\s*"([^"]+)"/gm,
        ),
        (m) => m[1],
      ),
    );

  return [
    "/",
    "/p",
    ...problemIds.map((id) => `/p/${id}`),
    "/k",
    ...knowledgeSlugs.map((slug) => `/k/${slug}`),
  ];
}
