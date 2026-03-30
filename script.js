import { C_gererHistorique } from "./gererHistorique.js";
import { C_gererValeurTempsReel } from "./gererValeurTempsReel.js";
import { C_donneeAjax } from "./donneeAjax.js";
import { chargerLayout } from "./layout.js";

class C_script {
    constructor() {
        this.init();
    }

    async init() {
        // 1. Chargement du Header et du Footer
        await chargerLayout();

        // 2. Initialisation des composants de données
        this.donneeAjax = new C_donneeAjax();
        this.sujetSurEcoute = this.donneeAjax.getSujet();

        // 3. Un gestionnaire par capteur
        this.gererValeurInt = new C_gererValeurTempsReel("interieur");
        this.gererValeurExt = new C_gererValeurTempsReel("exterieur");
        this.gererHistorique = new C_gererHistorique();

        // 4. Inscription des observateurs
        this.sujetSurEcoute.subscribe(this.gererValeurInt);
        this.sujetSurEcoute.subscribe(this.gererValeurExt);
        this.sujetSurEcoute.subscribe(this.gererHistorique);

        // 5. Interactions de la page
        this.gestionnairePage();

        // 6. Lancement des données
        this.donneeAjax.recupererDonnees();
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