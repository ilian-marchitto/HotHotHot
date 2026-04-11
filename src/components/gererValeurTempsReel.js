export class C_gererValeurTempsReel {
    constructor(nomDuCapteur) {
        this.type = nomDuCapteur; 

        this.O_firstValue = document.getElementById(`O_firstValue_${nomDuCapteur}`);
        this.O_elementDiv = document.getElementById(`bordure_${nomDuCapteur}`);
        this.O_commentaire = document.getElementById(`commentaire_${nomDuCapteur}`);
        this.O_temperatureMeter = document.getElementById(`temperatureMeter_${nomDuCapteur}`);
        this.O_minDisplay = document.getElementById(`tempMin_${nomDuCapteur}`);
        this.O_maxDisplay = document.getElementById(`tempMax_${nomDuCapteur}`);

        this.I_min = Infinity;
        this.I_max = -Infinity;
    }

    /**
     * Méthode appelée par le Sujet
     * @param {number|string} temperatureRaw - La valeur brute
     * @param {string} nomRecu - Le nom du capteur ("interieur" ou "exterieur")
     */
    update(temperatureRaw, nomRecu) {

        if (nomRecu !== this.type) return;

        const temperature = parseFloat(temperatureRaw);

        if (!this.O_firstValue || isNaN(temperature)) return;

        this.O_firstValue.textContent = temperature;
        if (this.O_temperatureMeter) {
            this.O_temperatureMeter.setAttribute("value", temperature);
        }

        if (temperature < this.I_min) {
            this.I_min = temperature;
            if (this.O_minDisplay) this.O_minDisplay.textContent = this.I_min;
        }
        if (temperature > this.I_max) {
            this.I_max = temperature;
            if (this.O_maxDisplay) this.O_maxDisplay.textContent = this.I_max;
        }

        let s_classeCouleur = "bordure-verte"; // Par défaut

        if (temperature < 0) {
            s_classeCouleur = "bordure-bleue";
        } else if (temperature >= 20 && temperature < 30) {
            s_classeCouleur = "bordure-orange";
        } else if (temperature >= 30) {
            s_classeCouleur = "bordure-rouge";
        }

        if (this.O_elementDiv) {
            this.O_elementDiv.className = `capteur-card ${s_classeCouleur}`;
        }

        let S_alerte = "";
        
        if (this.type === "exterieur") {
            if (temperature > 35) {
                S_alerte = "Hot Hot Hot !";
            } else if (temperature < 0) {
                S_alerte = "Banquise en vue !";
            }
        } else {
            // Capteur Intérieur
            if (temperature > 50) {
                S_alerte = "Appelez les pompiers ou arrêtez votre barbecue !";
            } else if (temperature > 22) {
                S_alerte = "Baissez le chauffage !";
            } else if (temperature < 0) {
                S_alerte = "Canalisations gelées, appelez SOS plombier et mettez un bonnet !";
            } else if (temperature < 12) {
                S_alerte = "Montez le chauffage ou mettez un gros pull !";
            }
        }

        if (S_alerte !== "") {
            this.O_commentaire.textContent = S_alerte;
            this.O_commentaire.hidden = false;
            this.O_commentaire.setAttribute("role", "alert");
        } else {
            this.O_commentaire.hidden = true;
        }

        if (typeof envoyerAlerteNotification === "function" && S_alerte !== "") {
            envoyerAlerteNotification(S_alerte, `La température ${this.type} est de ${temperature}°C`);
        }
    }
}