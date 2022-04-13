/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-20579bb';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./italske_listy_001.html","./italske_listy_002.html","./italske_listy_003.html","./italske_listy_004.html","./italske_listy_005.html","./italske_listy_006.html","./italske_listy_007.html","./italske_listy_008.html","./italske_listy_009.html","./italske_listy_010.html","./italske_listy_011.html","./italske_listy_012.html","./italske_listy_013.html","./italske_listy_014.html","./italske_listy_015.html","./italske_listy_016.html","./italske_listy_017.html","./italske_listy_018.html","./italske_listy_019.html","./italske_listy_020.html","./italske_listy_021.html","./italske_listy_022.html","./italske_listy_023.html","./italske_listy_024.html","./italske_listy_025.html","./italske_listy_026.html","./italske_listy_027.html","./italske_listy_028.html","./italske_listy_029.html","./italske_listy_031.html","./italske_listy_032.html","./italske_listy_030.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/image003.png","./resources/obalka.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});