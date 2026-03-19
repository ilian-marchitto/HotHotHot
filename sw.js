// sw.js
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installation en cours...');
});

self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activé et prêt à contrôler l\'application !');
});

self.addEventListener('fetch', (event) => {
    // C'est ici que le SW intercepte les requêtes réseau
    // Pour l'instant, on le laisse simplement continuer la requête normalement
});