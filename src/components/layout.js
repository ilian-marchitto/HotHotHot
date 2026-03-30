export async function chargerLayout() {
    try {
        const respHeader = await fetch('./header.html');
        const htmlHeader = await respHeader.text();
        document.getElementById('main-header').innerHTML = htmlHeader;

        const respFooter = await fetch('./footer.html');
        const htmlFooter = await respFooter.text();
        document.getElementById('main-footer').innerHTML = htmlFooter;

        // --- GESTION DE LA CONNEXION ---
        gererAffichageConnexion();

    } catch (erreur) {
        console.error("Erreur layout :", erreur);
    }
}

function gererAffichageConnexion() {
    const estConnecte = localStorage.getItem('estConnecte') === 'true';
    
    const menuCompte = document.getElementById('menu-mon-compte');
    const liConnexion = document.getElementById('li-connexion');
    const liDeconnexion = document.getElementById('li-deconnexion');
    const btnLogout = document.getElementById('btn-logout');

    if (estConnecte) {
        menuCompte.hidden = false;
        liConnexion.hidden = true;
        liDeconnexion.hidden = false;
    } else {
        menuCompte.hidden = true;
        liConnexion.hidden = false;
        liDeconnexion.hidden = true;
    }

    // Gestion du clic sur déconnexion
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('estConnecte');
            window.location.reload(); // Recharge la page pour actualiser le header
        });
    }
}