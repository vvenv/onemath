import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Silence Chrome DevTools' automatic probe for
// `/.well-known/appspecific/com.chrome.devtools.json` so it doesn't spam the
// dev server log with "No route matches URL" errors.
// Also silence probe for /sw.js to prevent 404 errors.
const silenceChromeDevtoolsProbe = {
  name: "silence-chrome-devtools-probe",
  configureServer(server: import("vite").ViteDevServer) {
    server.middlewares.use((req, res, next) => {
      if (req.url?.startsWith("/sw.js")) {
        res.statusCode = 204;
        res.end();
        return;
      }
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
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: null,
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
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,webmanifest,woff2}"],
        navigateFallback: "/index.html",
        cleanupOutdatedCaches: true,
        clientsClaim: true,
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
