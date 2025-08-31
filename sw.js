const CACHE_NAME = 'expense-tracker-v1';
const ASSETS = [
  './',
  './index.html',
  './site.webmanifest',
  './apple-touch-icon.png',
  './favicon-96x96.png',
  './favicon.jpeg',
  './web-app-manifest-192x192.png',
  './web-app-manifest-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : null))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then(c => c || fetch(event.request)));
});
