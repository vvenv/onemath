import type { Plugin } from "vite";

/**
 * Silence Chrome DevTools' automatic probe for
 * `/.well-known/appspecific/com.chrome.devtools.json` so it doesn't spam the
 * dev server log with "No route matches URL" errors.
 */
export const silenceChromeDevtoolsProbe: Plugin = {
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
