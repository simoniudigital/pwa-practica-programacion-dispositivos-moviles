var dataCacheName = "iudigital-v1";
var cacheName = 'iudigital';
var filesToCache = [
  '.',
  'manifest.json',
  'index.html',
  'js/app.js',
  'js/jquery-3.2.1.slim.min.js',
  'js/popper.js',
  'css/bootstrap-material-design.min.css',
  'css/css.css',
  'js/bootstrap-material-design.js',
  'images/iu-digital-logo.png',
  'images/icons/icon-72x72.png',
  "images/icons/icon-96x96.png",
  "images/icons/icon-128x128.png",
  "images/icons/icon-144x144.png",
  "images/icons/icon-152x152.png",
  "images/icons/icon-192x192.png",
  "images/icons/icon-384x384.png",
  "images/icons/icon-512x512.png"
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName)
    .then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  var dataUrl = 'http://localhost/pwa';
  if (e.request.url.indexOf(dataUrl) > -1) {
    // Estrategia "primero la red": pide el archivo al servidor y guarda
    // una copia. El .catch es indispensable: si no hay internet, fetch
    // falla y sin respaldo la aplicacion no cargaria nada.
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        }).catch(function() {
          // Sin red: se responde con la copia guardada.
          return caches.match(e.request);
        });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
