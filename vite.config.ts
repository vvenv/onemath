import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateSitemap } from "sitemap-ts";
import { defineConfig, type Plugin } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { getPrerenderPaths } from "./prerender-paths.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://edao.plus";

/**
 * Emit `public/sitemap.xml` and `public/robots.txt` at `buildStart` so that
 * Vite's built-in public-dir copy (which runs in `writeBundle`) picks them
 * up and places them into the static build output alongside the other
 * `public/*` assets. Keeping the write inside Vite's plugin pipeline means
 * any invocation of `react-router build` produces a usable sitemap without
 * requiring a separate npm script or host-specific `buildCommand` override.
 */
function sitemapPlugin(): Plugin {
  return {
    name: "onemath-sitemap",
    apply: "build",
    buildStart() {
      const publicDir = path.resolve(__dirname, "public");
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
    },
  };
}

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
    sitemapPlugin(),
    reactRouter(),
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
