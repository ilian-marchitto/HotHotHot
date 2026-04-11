export class C_gererValeurTempsReel {
    constructor(nomDuCapteur) {
        this.type = nomDuCapteur;
        this.storageKey = `hothothot_minmax_${nomDuCapteur}`;

        this.O_firstValue = document.getElementById(`O_firstValue_${nomDuCapteur}`);
        this.O_elementDiv = document.getElementById(`bordure_${nomDuCapteur}`);
        this.O_commentaire = document.getElementById(`commentaire_${nomDuCapteur}`);
        this.O_temperatureMeter = document.getElementById(`temperatureMeter_${nomDuCapteur}`);
        this.O_minDisplay = document.getElementById(`tempMin_${nomDuCapteur}`);
        this.O_maxDisplay = document.getElementById(`tempMax_${nomDuCapteur}`);

        const savedData = JSON.parse(localStorage.getItem(this.storageKey)) || { min: Infinity, max: -Infinity };
        this.I_min = savedData.min;
        this.I_max = savedData.max;

        if (this.I_min !== Infinity && this.O_minDisplay) this.O_minDisplay.textContent = this.I_min;
        if (this.I_max !== -Infinity && this.O_maxDisplay) this.O_maxDisplay.textContent = this.I_max;

        if (this.O_elementDiv) {
            this.O_elementDiv.addEventListener('click', () => this.afficherDetailAlerte());
        }
    }

    update(temperatureRaw, nomRecu) {
        if (nomRecu !== this.type) return;

        const temperature = parseFloat(temperatureRaw);
        if (!this.O_firstValue || isNaN(temperature)) return;

        const tempArrondie = Math.round(temperature * 10) / 10;
        this.O_firstValue.textContent = tempArrondie;
        if (this.O_temperatureMeter) this.O_temperatureMeter.value = tempArrondie;

        let aChange = false;
        if (tempArrondie < this.I_min) {
            this.I_min = tempArrondie;
            aChange = true;
        }
        if (tempArrondie > this.I_max) {
            this.I_max = tempArrondie;
            aChange = true;
        }

        if (aChange) {
            localStorage.setItem(this.storageKey, JSON.stringify({ min: this.I_min, max: this.I_max }));
            if (this.O_minDisplay) this.O_minDisplay.textContent = this.I_min;
            if (this.O_maxDisplay) this.O_maxDisplay.textContent = this.I_max;
        }

        let S_alerte = "";
        if (this.type === "exterieur") {
            if (tempArrondie > 35) S_alerte = "Hot Hot Hot !";
            else if (tempArrondie < 0) S_alerte = "Banquise en vue !";
        } else {
            if (tempArrondie > 50) S_alerte = "Appelez les pompiers ou arrêtez votre barbecue !";
            else if (tempArrondie > 22) S_alerte = "Baissez le chauffage !";
            else if (tempArrondie < 0) S_alerte = "Canalisations gelées, appelez SOS plombier et mettez un bonnet !";
            else if (tempArrondie < 12) S_alerte = "Montez le chauffage ou mettez un gros pull !";
        }

        this.O_commentaire.textContent = S_alerte;
        this.O_commentaire.hidden = (S_alerte === "");
        
        let couleur = "bordure-verte";
        if (tempArrondie < 0) couleur = "bordure-bleue";
        else if (tempArrondie >= 20 && tempArrondie < 30) couleur = "bordure-orange";
        else if (tempArrondie >= 30) couleur = "bordure-rouge";
        
        if (this.O_elementDiv) this.O_elementDiv.className = `capteur-card ${couleur}`;
    }

    afficherDetailAlerte() {
        const message = this.O_commentaire.textContent;
        if (!this.O_commentaire.hidden && message !== "") {
            alert(`[DÉTAIL ALERTE]\nCapteur : ${this.type}\nMessage : ${message}\nTempérature : ${this.O_firstValue.textContent}°C`);
        }
    }
}