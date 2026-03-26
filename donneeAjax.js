import { sujetSurEcoute } from "./sujetSurEcoute.js";
export class C_donneeAjax {
    constructor() {
        this.J_objetJson = null;
        this.leSujet = new sujetSurEcoute();
    }

    getSujet() {
        return this.leSujet;
    }

    async recupererDonneesBrutes() {
        try {
            const reponse = await fetch('./exempleJson.json');

            if (!reponse.ok) {
                throw new Error(`Erreur HTTP ! Statut : ${reponse.status}`);
            }

            this.J_objetJson = await reponse.json();
            return this.J_objetJson;

        } catch (erreur) {
            console.error("Impossible de charger le JSON :", erreur.message);
        }
    }

    async recupererDonnees() {

        // On attend que les données soient chargées 
        if (!this.J_objetJson) {
            await this.recupererDonneesBrutes();
        }

        const liste = this.J_objetJson.capteurs;

        let i = 0;
        setInterval(() => {
            if (i < liste.length) {
                const capteur = liste[i];
                i++;
                
                const type = capteur.type;
                const valeur = capteur.Valeur;
                const nom = capteur.Nom;
                const timestamp = capteur.Timestamp;
                
                // On envoie les données au sujet
                this.leSujet.nouvelleMesure(valeur, type, nom, timestamp);
            }else {
                i = 0; // Recommence à zéro pour simuler une boucle infinie de données
            }
        }, 2000);
    }

    
}