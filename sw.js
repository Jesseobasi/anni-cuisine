const CACHE_NAME = 'jesse-cuisines-v1';
const assets = [
  '/',
  '/index.html',
  '/menu.html',
  '/cart.html',
  '/style.css',
  '/cart.js',
  '/script.js',
  '/menu-data.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});