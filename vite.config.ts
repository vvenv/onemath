import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { getPrerenderPaths } from "./prerender-paths";
import { agentSkills } from "./vite-plugins/agent-skills";
import { markdownNegotiationPlugin } from "./vite-plugins/markdown-negotiation";
import { sitemapPlugin } from "./vite-plugins/sitemap";
import { silenceChromeDevtoolsProbe } from "./vite-plugins/silence-chrome-devtools-probe";
import { vercelOutputPlugin } from "./vite-plugins/vercel-output";

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

export default defineConfig({
  define: {
    // Frozen at build time so SSG HTML and client hydration observe the same
    // value. Consumed by deterministic helpers (e.g. seeded shuffle for the
    // home-page figured carousel) that must stay stable per deploy.
    __BUILD_ID__: JSON.stringify(buildRevision),
  },
  plugins: [
    tailwindcss(),
    silenceChromeDevtoolsProbe,
    agentSkills({
      skills: [
        {
          name: "generate-problem",
          sourceFile: ".windsurf/workflows/generate-problem.md",
        },
        {
          name: "optimize-problem",
          sourceFile: ".windsurf/workflows/optimize-problem.md",
        },
      ],
    }),
    sitemapPlugin(),
    reactRouter(),
    markdownNegotiationPlugin(),
    vercelOutputPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: null,
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      includeAssets: ["icon.svg", "icon-maskable.svg", "apple-touch-icon.svg"],
      manifest: {
        name: "一道+ / edao.plus",
        short_name: "一道+",
        description: "一道+：小学奥数问题集与学习系统",
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
