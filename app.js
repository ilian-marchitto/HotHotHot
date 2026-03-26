// Attente du chargement complet du DOM et des ressources pour ne pas bloquer le thread principal
window.addEventListener('load', () => {

    // Vérification de la compatibilité du navigateur avec les Service Workers
    if ('serviceWorker' in navigator) {

        // Enregistrement du Service Worker (SW) à la racine du scope
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                // Confirmation de l'enregistrement et affichage du périmètre d'action (scope)
                console.log('Service Worker enregistré avec succès !');
                console.log('Scope :', registration.scope);
            })
            .catch((error) => {
                // Gestion des erreurs lors de l'initialisation du SW
                console.error('Échec de l\'enregistrement du Service Worker :', error);
            });

    } else {
        console.log('Les Service Workers ne sont pas supportés par ce navigateur.');
    }
});

// Monitoring de l'état de la connectivité réseau
window.addEventListener('online', () => console.log('Mode en ligne activé'));
window.addEventListener('offline', () => console.log('Mode hors-ligne détecté'));