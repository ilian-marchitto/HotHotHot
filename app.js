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
const installButton = document.getElementById('btn-install');

window.addEventListener('beforeinstallprompt', (e) => {
    // On empêche le navigateur d'afficher le mini-bandeau d'installation
    e.preventDefault();
    deferredPrompt = e;
    // On affiche le bouton HTML personnalisé
    installButton.style.display = 'block';
});

installButton.addEventListener('click', async () => {
    // Si on n'a pas sauvegardé l'événement, on ne fait rien
    if (!deferredPrompt) {
        return;
    }

    // On déclenche l'affichage du pop-up d'installation natif du système
    deferredPrompt.prompt();

    // On attend de voir ce que l'utilisateur a choisi
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Choix de l'utilisateur : ${outcome}`);

    // Peu importe le choix, on ne peut utiliser l'événement qu'une seule fois.
    // On vide donc la variable et on cache le bouton.
    deferredPrompt = null;
    installButton.style.display = 'none';
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