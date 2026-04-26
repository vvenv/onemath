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

  // Normal service worker registration
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function (err) {
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
