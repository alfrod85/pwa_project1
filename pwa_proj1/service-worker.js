// Service Worker para convertir la página en una PWA

// Define el nombre de la caché
var CACHE_NAME = 'mi-pwa-cache';

// Lista de archivos requeridos para la aplicación
var urlsToCache = [
  '/',
  'pagina1.html',
  'index.html'
];

// Instalación del Service Worker
self.addEventListener('install', function(event) {
  // Realiza la instalación
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache abierta');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', function(event) {
  // Borra cachés antiguas
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Intercepta las solicitudes y devuelve el contenido desde la caché si está disponible
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Si se encuentra en caché, devuelve la respuesta de la caché
        if (response) {
          return response;
        }
        // Si no está en caché, realiza la solicitud de red
        return fetch(event.request);
      })
  );
});
