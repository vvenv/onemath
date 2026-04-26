export const pwaRegisterScript = `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function () {});
  });

  // Global error handler for module load failures
  window.addEventListener('error', function (event) {
    // Detect module script load errors (like manifest-*.js 404)
    if (event.target && event.target.tagName === 'SCRIPT') {
      console.error('Module load error:', event);
      // Clear caches and reload
      if ('caches' in window) {
        caches.keys().then(function (cacheNames) {
          return Promise.all(
            cacheNames.map(function (cacheName) {
              return caches.delete(cacheName);
            })
          );
        }).then(function () {
          // Reload after clearing caches
          window.location.reload();
        });
      } else {
        window.location.reload();
      }
    }
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', function (event) {
    console.error('Unhandled rejection:', event.reason);
    // If it's a network error, try to reload
    if (event.reason && event.reason.name === 'TypeError') {
      window.location.reload();
    }
  });
}`;
