// Generate `public/sitemap.xml` and `public/robots.txt` from the same route
// list that drives React Router's prerender step. Runs as a pre-build hook
// (see `package.json#scripts.build`) so the generated files live in `public/`
// by the time Vite copies the static dir into the build output — guaranteed
// to be picked up by any host (Vercel, Netlify, Cloudflare Pages, …).
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateSitemap } from "sitemap-ts";

import { getPrerenderPaths } from "../prerender-paths.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(here, "..", "public");
const SITE_URL = "https://edao.plus";

mkdirSync(publicDir, { recursive: true });

generateSitemap({
  hostname: SITE_URL,
  outDir: publicDir,
  dynamicRoutes: getPrerenderPaths(),
  generateRobotsTxt: true,
  readable: true,
  changefreq: "weekly",
  priority: { "/": 1.0, "*": 0.7 },
  lastmod: new Date(),
});

console.log(
  `[seo] wrote ${path.join(publicDir, "sitemap.xml")} and ${path.join(publicDir, "robots.txt")}`,
);
