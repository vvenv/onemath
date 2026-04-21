/// <reference lib="webworker" />
import {
  cleanupOutdatedCaches,
  matchPrecache,
  precacheAndRoute,
} from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";

declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<{ url: string; revision: string | null }>;
};

// Activate immediately on new deploys so users pick up the fix within one
// refresh, without needing to close all tabs.
self.skipWaiting();
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

/**
 * Path-aware navigation handler.
 *
 * Every route is prerendered to `<path>/index.html` at build time and all of
 * those entries are in the precache manifest (see `vite.config.ts`). For a
 * navigation request to `/k` we look up the precached `/k/index.html` so the
 * user sees the correct per-route `<title>` / meta / first-paint markup. If
 * the path isn't precached (e.g. an unknown route), we fall back to the SPA
 * shell at `/index.html` and let client-side React Router render the 404.
 */
const navigationHandler = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const cleaned = url.pathname.replace(/\/+$/, "") || "/";
  const target = cleaned === "/" ? "/index.html" : `${cleaned}/index.html`;

  const precached = await matchPrecache(target);
  if (precached) return precached;

  const fallback = await matchPrecache("/index.html");
  if (fallback) return fallback;

  return fetch(request);
};

registerRoute(new NavigationRoute(navigationHandler));
