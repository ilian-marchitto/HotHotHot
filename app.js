
// On demande au navigateur s'il connait la technologie service workers
if ('serviceWorker' in navigator) {
    // On attend que la page soit chargée
    window.addEventListener('load', () => {
        // On donne le fichier sw à l'application
        navigator.serviceWorker.register('/sw.js')
            // Réussite
            .then(registration => {
                console.log('Service Worker enregistré avec succès avec la portée :', registration.scope);
            })
            // Echec
            .catch(error => {
                console.error('Échec de l\'enregistrement du Service Worker :', error);
            });
    });
}
