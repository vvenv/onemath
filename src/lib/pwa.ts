/**
 * One-shot Service Worker uninstall script.
 *
 * Earlier deploys shipped a Workbox-powered Service Worker (see git history
 * for the removed `src/sw.ts`) that precached HTML and JS. That cache was the
 * primary source of React hydration error #418: returning users could be
 * served a stale precached HTML against the latest JS chunks for one frame
 * before the SW updated, producing a real text mismatch.
 *
 * We removed the SW entirely. This script runs on every page load for
 * clients that still have the old SW registered, unregisters it, and clears
 * every Cache Storage entry it created. After the next reload these clients
 * are back to a plain network-fetched site. Once telemetry shows no more
 * registrations in the wild this script can be deleted.
 */
export const pwaUnregisterScript = `
(function () {
  if (!('serviceWorker' in navigator)) return;
  try {
    navigator.serviceWorker.getRegistrations().then(function (regs) {
      if (!regs || regs.length === 0) return;
      var unregistered = false;
      Promise.all(
        regs.map(function (reg) {
          return reg.unregister().then(function (ok) {
            if (ok) unregistered = true;
          });
        })
      )
        .then(function () {
          if ('caches' in window) {
            return caches.keys().then(function (keys) {
              return Promise.all(
                keys.map(function (k) {
                  return caches.delete(k);
                })
              );
            });
          }
        })
        .then(function () {
          // Reload once so the page is no longer controlled by the old SW
          // and is served fresh from the network.
          if (unregistered) window.location.reload();
        })
        .catch(function () {
          /* noop */
        });
    });
  } catch (e) {
    /* noop */
  }
})();`;
