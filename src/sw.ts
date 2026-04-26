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
 * Path-aware navigation handler (NetworkFirst).
 *
 * Every route is prerendered to `<path>/index.html` at build time and all of
 * those entries are in the precache manifest (see `vite.config.ts`). We try
 * the network first so returning users always pick up HTML referencing the
 * latest hashed chunks (otherwise stale precached HTML would 404 on deleted
 * `manifest-*.js` / entry chunks after a redeploy). On failure (offline or
 * fetch error) we fall back to the precached `<path>/index.html`, then to
 * the SPA shell `/index.html` so client-side React Router can render 404.
 */
const navigationHandler = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const cleaned = url.pathname.replace(/\/+$/, "") || "/";
  const target = cleaned === "/" ? "/index.html" : `${cleaned}/index.html`;

  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) return fresh;
  } catch {
    // fall through to precache
  }

  const precached = await matchPrecache(target);
  if (precached) return precached;

  const fallback = await matchPrecache("/index.html");
  if (fallback) return fallback;

  return fetch(request);
};

// Only handle navigation requests (requests expecting HTML), not static assets
// Exclude paths that end with a file extension (e.g., .js, .css)
registerRoute(
  new NavigationRoute(navigationHandler, {
    allowlist: [/^\/(?:[^/]+\/)*[^/.]+$/],
  }),
);
