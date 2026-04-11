import { sujetSurEcoute } from "../core/sujetSurEcoute.js";

export class C_donneeAjax {
    constructor() {
        this.leSujet = new sujetSurEcoute();
        this.wsUrl = "wss://ws.hothothot.dog:9502";
        this.cacheKey = "hothothot_last_data";
    }

    getSujet() {
        return this.leSujet;
    }

    async recupererDonnees() {
        if (navigator.onLine) {
            this.initWebsocket();
        } else {
            console.log("Mode Offline : Tentative de récupération du cache...");
            this.chargerAlternativeCache();
        }
    }

    initWebsocket() {
        const socket = new WebSocket(this.wsUrl);

        socket.onopen = () => {
            socket.send("Hello HotHotHot !");
            console.log("WebSocket connecté. Données attendues dans 1 min...");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            localStorage.setItem(this.cacheKey, event.data);
            
            this.traiterDonnees(data);
        };

        socket.onclose = () => {
            console.warn("WebSocket déconnecté. Bascule sur l'alternative...");
            this.chargerAlternativeCache();
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
        const lastData = localStorage.getItem(this.cacheKey);
        
        if (lastData) {
            console.log("Données chargées depuis le LocalStorage.");
            this.traiterDonnees(JSON.parse(lastData));
        } else {
            console.log("Pas de cache, chargement du JSON local...");
            try {
                const reponse = await fetch('../../assets/data/exempleJson.json');
                const data = await reponse.json();
                this.traiterDonnees(data);
            } catch (e) {
                console.error("Plus aucune source de données disponible.");
            }
        }
    }
}