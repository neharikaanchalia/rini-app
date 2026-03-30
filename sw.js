const cacheName = 'rini-v1';
const assets = [
  './',
  './index.html',
  './manifest.json'
];

// Install the Service Worker
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Rini app is caching files for offline use');
      cache.addAll(assets);
    })
  );
});

// Fetch files from cache if offline
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});