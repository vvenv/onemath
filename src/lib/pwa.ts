export const pwaRegisterScript = `
(function() {
  if (!('serviceWorker' in navigator)) return;

  // Clear all caches (only called on error)
  function clearAllCaches() {
    if ('caches' in window) {
      return caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }
    return Promise.resolve();
  }

  // Force service worker update and clear caches
  function forceUpdateServiceWorker() {
    return navigator.serviceWorker.getRegistration().then(function (registration) {
      if (registration) {
        return registration.unregister().then(function () {
          return clearAllCaches();
        });
      }
      return clearAllCaches();
    }).then(function () {
      return navigator.serviceWorker.register('/sw.js');
    }).catch(function (err) {
      console.error('Service worker registration failed:', err);
    });
  }

  // Normal service worker registration.
  // Proactively check for updates on every page load and, when a new SW
  // finishes installing, reload the page so users stuck on a stale precached
  // HTML (referencing deleted hashed chunks) auto-recover within one extra
  // refresh, without waiting for them to hit a 404 first.
  var hadController = !!navigator.serviceWorker.controller;
  var reloadedForUpdate = false;
  function reloadOnce() {
    if (reloadedForUpdate) return;
    reloadedForUpdate = true;
    window.location.reload();
  }
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    // Only reload if the page was already controlled by an old SW; on first
    // ever registration we don't want to bounce the user.
    if (hadController) reloadOnce();
  });
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
      try { registration.update(); } catch (e) { /* noop */ }
      registration.addEventListener('updatefound', function () {
        var installing = registration.installing;
        if (!installing) return;
        installing.addEventListener('statechange', function () {
          if (installing.state === 'installed' && hadController) {
            reloadOnce();
          }
        });
      });
    }).catch(function (err) {
      console.error('Service worker registration failed:', err);
    });
  });

  // Global error handler - only clear caches on actual errors.
  // Resource load errors (e.g. <script src="...manifest-XXX.js"> 404) do NOT
  // bubble; we must listen in the capture phase to see them at window.
  var recovering = false;
  function recover() {
    if (recovering) return;
    recovering = true;
    forceUpdateServiceWorker().then(function () {
      window.location.reload();
    });
  }
  window.addEventListener('error', function (event) {
    var target = event.target;
    if (target && (target.tagName === 'SCRIPT' || target.tagName === 'LINK')) {
      console.error('Asset load error, forcing cache clear:', target.src || target.href);
      recover();
    }
  }, true);

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', function (event) {
    console.error('Unhandled rejection:', event.reason);
    // If it's a network error, force update
    if (event.reason && event.reason.name === 'TypeError') {
      forceUpdateServiceWorker().then(function () {
        window.location.reload();
      });
    }
  });
})();`;
