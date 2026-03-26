import { sujetSurEcoute } from "./sujetSurEcoute.js";
import { C_gererHistorique } from "./gererHistorique.js";
import { C_gererValeurTempsReel } from "./gererValeurTempsReel.js";
import { C_donneeAjax } from "./donneeAjax.js";
import { chargerLayout } from "./layout.js";

class C_script {
    constructor() {
        // On lance l'initialisation asynchrone
        this.init();
    }

    async init() {
        // 1. On attend impérativement le chargement du Header et du Footer
        await chargerLayout();

        // 2. Initialisation des composants de données
        this.donneeAjax = new C_donneeAjax();
        this.sujetSurEcoute = this.donneeAjax.getSujet();

        // 3. Initialisation des gestionnaires d'interface
        this.gererValeurTempsReel = new C_gererValeurTempsReel();
        this.gererHistorique = new C_gererHistorique();

        // 4. Inscription des observateurs
        this.sujetSurEcoute.subscribe(this.gererValeurTempsReel);
        this.sujetSurEcoute.subscribe(this.gererHistorique);

        // 5. Configuration des interactions de la page
        this.gestionnairePage();

        // 6. Lancement de la récupération des données
        this.donneeAjax.recupererDonnees();
    }

    // Gestion de l'affichage des parties température et historique
    gestionnairePage() {
        const O_temperature = document.getElementById("afficherPartieTemperature");
        const O_historique = document.getElementById("afficherPartieHistorique");

        let O_partieTemprature = document.getElementById("partieTemprature");
        let O_partieHistorique = document.getElementById("partieHistorique");

        // On cache les parties par défaut
        if (O_partieTemprature) O_partieTemprature.hidden = true;
        if (O_partieHistorique) O_partieHistorique.hidden = true;

        // Ecouteurs d'événements pour le basculement (toggle)
        if (O_temperature && O_partieTemprature) {
            O_temperature.addEventListener("click", () => {
                O_partieTemprature.hidden = !O_partieTemprature.hidden;
            });
        }

        if (O_historique && O_partieHistorique) {
            O_historique.addEventListener("click", () => {
                O_partieHistorique.hidden = !O_partieHistorique.hidden;
            });
        }
    }
}

// Lancement de l'application
new C_script();