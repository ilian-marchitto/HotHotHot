import { C_gererHistorique } from "../components/gererHistorique.js";
import { C_gererValeurTempsReel } from "../components/gererValeurTempsReel.js";
import { C_gererAlertes } from "../components/gererAlertes.js";
import { C_donneeAjax } from "../services/donneeAjax.js";
import { chargerLayout } from "../components/layout.js";

class C_script {
    constructor() {
        this.init();
    }

    async init() {
        // On charge le Header et le Footer
        await chargerLayout();

        // On initialise les composants de données
        this.donneeAjax = new C_donneeAjax();
        this.sujetSurEcoute = this.donneeAjax.getSujet();

        // On initialise un gestionnaire par capteur
        this.gererValeurInt = new C_gererValeurTempsReel("interieur");
        this.gererValeurExt = new C_gererValeurTempsReel("exterieur");
        this.gererHistorique = new C_gererHistorique();
        this.gererAlertes = new C_gererAlertes();

        // On inscrit des observateurs
        this.sujetSurEcoute.subscribe(this.gererValeurInt);
        this.sujetSurEcoute.subscribe(this.gererValeurExt);
        this.sujetSurEcoute.subscribe(this.gererHistorique);
        this.sujetSurEcoute.subscribe(this.gererAlertes);

        // On gère la page
        this.gestionnairePage();

        // On expose le sujet après un tick pour laisser le temps
        //    au <script type="module"> de index.html d'enregistrer son listener
        window.leSujet = this.sujetSurEcoute;
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent("sujetPret", { detail: this.sujetSurEcoute }));
            // On lance les données (après que tous les abonnés soient prêts)
            this.donneeAjax.recupererDonnees();
        }, 0);
    }

    gestionnairePage() {
        const btnTemp = document.getElementById("btnTemp");
        const btnHist = document.getElementById("btnHist");
        const zoneTemp = document.getElementById("partieTemprature");
        const zoneHist = document.getElementById("partieHistorique");

        btnTemp.addEventListener("click", () => {
            zoneTemp.hidden = false;
            zoneHist.hidden = true;
            btnTemp.setAttribute("aria-selected", "true");
            btnHist.setAttribute("aria-selected", "false");
        });

        btnHist.addEventListener("click", () => {
            zoneTemp.hidden = true;
            zoneHist.hidden = false;
            btnTemp.setAttribute("aria-selected", "false");
            btnHist.setAttribute("aria-selected", "true");
        });
    }
}

new C_script();