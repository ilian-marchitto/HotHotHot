import { sujetSurEcoute } from "../core/sujetSurEcoute.js";

export class C_donneeAjax {
    constructor() {
        this.leSujet = new sujetSurEcoute();
        this.wsUrl = "wss://ws.hothothot.dog:9502";
        this.cacheKey = "hothothot_historique_24h";
    }

    getSujet() {
        return this.leSujet;
    }

    async recupererDonnees() {
        // Au chargement, on lit tout l'historique pour afficher le graphique immédiatement
        this.restaurerHistoriqueCache();

        // On gère la connexion en temps réel
        if (navigator.onLine) {
            this.initWebsocket();
        } else {
            // S'il n'y a pas de réseau ET que le cache est vide, on lit le JSON de secours
            const cacheExistant = localStorage.getItem(this.cacheKey);
            if (!cacheExistant || JSON.parse(cacheExistant).length === 0) {
                console.log("Mode Offline : Tentative de récupération du fichier JSON de secours...");
                this.chargerAlternativeCache();
            }
        }
    }

    restaurerHistoriqueCache() {
        const cacheExistant = localStorage.getItem(this.cacheKey);
        if (cacheExistant) {
            const historique = JSON.parse(cacheExistant);
            console.log(`UX : Restauration de l'historique (${historique.length} valeurs)...`);
            historique.forEach(item => {
                this.traiterDonnees(item.payload);
            });
        }
    }

    initWebsocket() {
        const socket = new WebSocket(this.wsUrl);

        socket.onopen = () => {
            socket.send("Hello HotHotHot !");
            console.log("WebSocket connecté. Données en temps réel activées.");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            let historique = [];
            const cacheExistant = localStorage.getItem(this.cacheKey);
            if (cacheExistant) {
                historique = JSON.parse(cacheExistant);
            }

            // On ajoute la nouvelle donnée avec l'heure exacte de réception
            const now = Date.now();
            historique.push({
                timestampRecu: now,
                payload: data
            });

            const limite24h = now - (24 * 60 * 60 * 1000);
            historique = historique.filter(item => item.timestampRecu >= limite24h);

            // On sauvegarde le nouveau tableau proprement dans le cache
            localStorage.setItem(this.cacheKey, JSON.stringify(historique));

            // On traite la donnée pour l'affichage en temps réel
            this.traiterDonnees(data);
        };

        socket.onclose = () => {
            console.warn("WebSocket déconnecté.");
        };
    }

    traiterDonnees(data) {
        if (data.capteurs) {
            data.capteurs.forEach(capteur => {
                this.leSujet.nouvelleMesure(
                    capteur.Valeur,
                    capteur.type,
                    capteur.Nom,
                    capteur.Timestamp
                );
            });
        }
    }

    async chargerAlternativeCache() {
        console.log("Pas de cache 24h trouvé, chargement du JSON local par défaut...");
        try {
            const reponse = await fetch('../../assets/data/exempleJson.json');
            const data = await reponse.json();
            this.traiterDonnees(data);
        } catch (e) {
            console.error("Plus aucune source de données disponible.");
        }
    }
}