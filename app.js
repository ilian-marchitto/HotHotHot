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

// On crée une variable globale pour stocker l'événement d'installation
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // On empêche le navigateur d'afficher le mini-bandeau d'installation
    e.preventDefault();
    deferredPrompt = e;
    // On affiche le bouton HTML personnalisé
    const installBtn = document.getElementById('btn-install');
    if (installBtn) installBtn.style.display = 'block';
});

document.body.addEventListener('click', async (event) => {
    // Si l'élément cliqué a l'ID 'btn-install' (peu importe quand il a été créé !)
    if (event.target && event.target.id === 'btn-install') {

        if (!deferredPrompt) {
            return;
        }

        // On lance le pop-up d'installation
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`Résultat de l'installation : ${outcome}`);

        // On vide la variable
        deferredPrompt = null;

        // On cache le bouton
        event.target.style.display = 'none';
    }
});

// Optionnel mais recommandé : Écouter si l'application a bien été installée
window.addEventListener('appinstalled', () => {
    // On nettoie la variable si l'app a été installée par un autre moyen (ex: icône dans la barre d'adresse)
    deferredPrompt = null;
    console.log('PWA HotHotHot installée avec succès !');
});

// Monitoring de l'état de la connectivité réseau
window.addEventListener('online', () => console.log('Mode en ligne activé'));
window.addEventListener('offline', () => console.log('Mode hors-ligne détecté'));