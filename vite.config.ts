import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import { VitePWA } from "vite-plugin-pwa";

import { getPrerenderPaths } from "./prerender-paths";

const SITE_URL = "https://edao.plus";

const viteConfigDir = path.dirname(fileURLToPath(import.meta.url));

/**
 * Write `sitemap.xml` into the static build output after the React Router
 * build finishes. Uses the same route list as the prerender step so the
 * sitemap always matches the set of HTML files actually emitted.
 */
function sitemapPlugin(): Plugin {
  let outDir = "";
  return {
    name: "onemath-sitemap",
    apply: "build",
    configResolved(config) {
      // RR writes the browser bundle to `build/client`; the first vite env
      // to resolve sets our target output dir.
      if (!outDir && config.build?.outDir?.includes("client")) {
        outDir = path.resolve(config.root, config.build.outDir);
      }
    },
    closeBundle: {
      order: "post",
      sequential: true,
      async handler() {
        const target = outDir || path.resolve(viteConfigDir, "build/client");
        const lastmod = new Date().toISOString().split("T")[0];
        const body = getPrerenderPaths()
          .map(
            (p) =>
              `  <url>\n    <loc>${SITE_URL}${p === "/" ? "/" : p}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${p === "/" ? "1.0" : "0.7"}</priority>\n  </url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
        try {
          await writeFile(path.join(target, "sitemap.xml"), xml, "utf-8");
        } catch {
          // build/client might not exist yet on the SSR pass; the client pass
          // will emit the sitemap.
        }
      },
    },
  };
}

const __dirname = viteConfigDir;

// Seed the Service Worker precache with every prerendered route's HTML so the
// custom navigation handler in `src/sw.ts` can serve them path-aware. RR
// writes these files *after* VitePWA finalizes the SW, so `globPatterns`
// alone cannot pick them up — we register them explicitly here and let
// Workbox fetch them from the deployment on SW install. A single
// build-timestamp revision invalidates them all on every deploy.
const buildRevision = `${Date.now()}`;
const prerenderedHtmlEntries = getPrerenderPaths().map((routePath) => ({
  url: routePath === "/" ? "/index.html" : `${routePath}/index.html`,
  revision: buildRevision,
}));

// Silence Chrome DevTools' automatic probe for
// `/.well-known/appspecific/com.chrome.devtools.json` so it doesn't spam the
// dev server log with "No route matches URL" errors.
const silenceChromeDevtoolsProbe = {
  name: "silence-chrome-devtools-probe",
  configureServer(server: import("vite").ViteDevServer) {
    server.middlewares.use((req, res, next) => {
      if (req.url?.startsWith("/.well-known/appspecific/com.chrome.devtools")) {
        res.statusCode = 204;
        res.end();
        return;
      }
      next();
    });
  },
};

export default defineConfig({
  plugins: [
    tailwindcss(),
    silenceChromeDevtoolsProbe,
    reactRouter(),
    sitemapPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: null,
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      includeAssets: [
        "icon.svg",
        "icon-maskable.svg",
        "apple-touch-icon.svg",
      ],
      manifest: {
        name: "一道 / edao.plus",
        short_name: "一道",
        description: "一道：小学奥数问题集与学习系统",
        lang: "zh-CN",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#262626",
        icons: [
          {
            src: "/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "/icon-maskable.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "maskable",
          },
        ],
      },
      injectManifest: {
        globPatterns: ["**/*.{js,css,svg,png,ico,webmanifest,woff2}"],
        additionalManifestEntries: prerenderedHtmlEntries,
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
