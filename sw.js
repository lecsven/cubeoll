/* CubeOLL service worker — precache the tools so they work offline. */
const CACHE = 'cubeoll-v8';
const ASSETS = [
  './',
  './index.html',
  './oll.html',
  './oll-pairs.html',
  './oll-practice.html',
  './oll-trainer.html',
  './oll-inverse.html',
  './assets/ollcases.js',
  './manifest.webmanifest',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req)
        .then((res) => {
          try {
            if (res && res.status === 200 && new URL(req.url).origin === self.location.origin) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(req, copy));
            }
          } catch (_) {}
          return res;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
