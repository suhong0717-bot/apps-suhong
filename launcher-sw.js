const CACHE_NAME = 'ai-tool-v10.07';
const URLS = [
  '/apps-suhong/index.html',
  '/apps-suhong/follow.html',
  '/apps-suhong/asset.html',
  '/apps-suhong/soxl.html',
  '/apps-suhong/wedding.html',
  '/apps-suhong/launcher-manifest.json'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).then(function(res) {
        var clone = res.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(e.request, clone);
        });
        return res;
      });
    }).catch(function() {
      return caches.match('/apps-suhong/index.html');
    })
  );
});
