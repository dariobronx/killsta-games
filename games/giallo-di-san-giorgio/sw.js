const CACHE = 'giallo-694e21181c';
const FILES = ["./","game.694e21181c.js","install.js","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('giallo-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  // The page itself: internet first, so a new version shows at once; the saved copy only when offline.
  // "no-cache" makes the browser ask the site every time instead of reusing its own copy of the page.
  if (e.request.mode === 'navigate') { e.respondWith(fetch(e.request.url, { cache: 'no-cache' }).catch(() => caches.match('./'))); return; }
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request)));
});
