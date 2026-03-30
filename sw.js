const cacheName = 'rini-v3'; // Increment this (v3, v4...) every time you update
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://img.icons8.com/ios-filled/192/F06292/lotus.png'
];

// Install Event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting(); // Forces the new service worker to become active immediately
});

// Activate Event (Cleanup old caches)
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch Event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});