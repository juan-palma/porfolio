self.addEventListener('install', function (event) {
	// Instalar de inmediato
	if (self.skipWaiting) { self.skipWaiting(); }
	event.waitUntil(
		caches.open('cache01').then(function (cache) {
			return cache.addAll([
				'/',
				'index.html',
				'assets/css/main.css',
				'assets/img/ajax.webp',
				'assets/img/idalibre-logo.svg',
				'assets/img/juan-palma-logo-obscuro.svg',
				'assets/js/librerias/modernizr.js',
				'assets/js/librerias/parallax.js',
				'assets/js/librerias/require.js',
				'assets/js/owner/main.js',
				'assets/js/owner/validaciones.js'
			]);
		})
	);
});
// Cache, falling back to network
self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});
// Elimina archivos de cache viejos
var cacheWhitelist = ['cache01'];
caches.keys().then(function (cacheNames) {
	return Promise.all(
		cacheNames.map(function (cacheName) {
			if (cacheWhitelist.indexOf(cacheName) === -1) {
				return caches.delete(cacheName);
			}
		})
	);
});
caches.keys().then(function (cacheKeys) {
	// Muestra en la consola la cache instalada 
	//console.log('Versión SW: ' + cacheKeys);
});