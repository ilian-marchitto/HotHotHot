export async function chargerLayout() {
    try {
        // Chargement du Header
        const respHeader = await fetch('./header.html');
        const htmlHeader = await respHeader.text();
        document.getElementById('main-header').innerHTML = htmlHeader;

        // Chargement du Footer
        const respFooter = await fetch('./footer.html');
        const htmlFooter = await respFooter.text();
        document.getElementById('main-footer').innerHTML = htmlFooter;
    } catch (erreur) {
        console.error("Erreur lors du chargement du layout :", erreur);
    }
}