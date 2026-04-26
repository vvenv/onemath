import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { getPrerenderPaths } from "../prerender-paths";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://edao.plus";

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Emit `public/sitemap.xml` and `public/robots.txt` at `buildStart` so that
 * Vite's built-in public-dir copy (which runs in `writeBundle`) picks them
 * up and places them into the static build output alongside the other
 * `public/*` assets. Keeping the write inside Vite's plugin pipeline means
 * any invocation of `react-router build` produces a usable sitemap without
 * requiring a separate npm script or host-specific `buildCommand` override.
 */
export function sitemapPlugin(): Plugin {
  return {
    name: "onemath-sitemap",
    apply: "build",
    buildStart() {
      const publicDir = path.resolve(__dirname, "..", "public");
      const lastmod = new Date().toISOString().slice(0, 10);
      const urls = getPrerenderPaths()
        .map((routePath) => {
          const loc = xmlEscape(`${SITE_URL}${routePath}`);
          const priority = routePath === "/" ? "1.0" : "0.7";
          return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
        })
        .join("\n");
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
      const robots = `User-agent: *\nAllow: /\nContent-Signal: ai-train=no, search=yes, ai-input=no\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
      writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
      writeFileSync(path.join(publicDir, "robots.txt"), robots);
    },
  };
}
