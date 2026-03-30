const CACHE_NAME = 'hothothot-cache-v1.0.0';

// La liste de tous les fichiers à sauvegarder à l'installation
const urlsToCache = [

    // --- Fichier à la racine ---
    '/',
    '/index.html',
    '/manifest.json',
    '/app.js',

    // --- Fichier style ---
    '/assets/css/footer.css',
    '/assets/css/header.css',
    '/assets/css/login.css',
    '/assets/css/style.css',

    // --- Images ---
    '/assets/img/icons/apple-touch-icon.png',
    '/assets/img/icons/favicon-96x96.png',
    '/assets/img/icons/web-app-manifest-192x192.png',
    '/assets/img/icons/web-app-manifest-512x512.png',

    // --- Data ---
    '/assets/data/exempleJson.json',

    // --- les scripts JS ---

    // Components
    '/src/components/gererHistorique.js',
    '/src/components/gererValeurTempsReel.js',
    '/src/components/layout.js',

    // Core
    '/src/core/script.js',
    '/src/core/sujetSurEcoute.js',

    //Services
    '/src/services/donneeAjax.js',
    '/src/services/genereValeursTemperatures.js',

    // --- Views HTML ---
    '/src/views/compte.html',
    '/src/views/documentation.html',
    '/src/views/footer.html',
    '/src/views/header.html',
    '/src/views/login.html'
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