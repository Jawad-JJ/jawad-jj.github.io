/* Salami Khata service worker: keeps the app working with no internet.
   When you publish an update, change VERSION so phones download the new files. */
const VERSION = 'v1.1.0';
const APP_CACHE = 'salami-khata-' + VERSION;
const FONT_CACHE = 'salami-khata-fonts';
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './privacy.html',
  './delete-account.html',
  './firebase-config.js',
  './fonts/chorus.woff',
  './fonts/lora.woff',
  './fonts/poppins-regular.woff',
  './fonts/poppins-medium.woff',
  './fonts/poppins-bold.woff',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-192.png',
  './icons/maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== APP_CACHE && k !== FONT_CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // App files: serve from cache first, fall back to the network, then to the app page.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(APP_CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => (req.mode === 'navigate' ? caches.match('./index.html') : Response.error())))
    );
    return;
  }

  // Google Fonts and the sign-in library: use the saved copy, refresh it in the background when online.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com' ||
      (url.hostname === 'www.gstatic.com' && url.pathname.startsWith('/firebasejs/'))) {
    event.respondWith(
      caches.open(FONT_CACHE).then((cache) => cache.match(req).then((hit) => {
        const net = fetch(req).then((res) => { cache.put(req, res.clone()); return res; }).catch(() => hit);
        return hit || net;
      }))
    );
  }
});
