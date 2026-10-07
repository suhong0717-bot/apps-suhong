// 네트워크 우선: 항상 최신 파일을 받아오고, 오프라인일 때만 저장본 사용
const CACHE_NAME = 'ai-tool-v10.07b';

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    }).then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return; // Google 등 외부 요청은 건드리지 않음
  e.respondWith(
    fetch(req, { cache: 'no-cache' }).then(function(res) {
      if (res && res.ok) {
        var clone = res.clone();
        caches.open(CACHE_NAME).then(function(cache) { cache.put(req, clone); });
      }
      return res;
    }).catch(function() {
      return caches.match(req).then(function(cached) {
        return cached || caches.match('/apps-suhong/index.html');
      });
    })
  );
});
