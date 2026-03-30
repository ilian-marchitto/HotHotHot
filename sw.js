const CACHE_NAME = 'hothothot-cache-v1.0.0';

// La liste de tous les fichiers à sauvegarder à l'installation
const urlsToCache = [
    '/', // La racine
    '/index.html', // L'accueil (Exigence 2)
    '/documentation.html', // La documentation (Exigence 1)
    '/manifest.json'
    // Ajouter les différents fichiers
];

self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installation en cours...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                // cache.addAll télécharge et sauvegarde tout le tableau urlsToCache
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activé et prêt à contrôler l\'application !');
});

self.addEventListener('fetch', (event) => {
})