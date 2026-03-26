export class C_gererValeurTempsReel {
    constructor(type) {
        this.type = type;
        this.O_firstValue = document.getElementById(`O_firstValue_${type}`);
        this.O_elementDiv = document.getElementById(`bordure_${type}`);
        this.O_commentaire = document.getElementById(`commentaire_${type}`);
        this.O_temperatureMeter = document.getElementById(`temperatureMeter_${type}`);
        
        this.O_minDisplay = document.getElementById(`tempMin_${type}`);
        this.O_maxDisplay = document.getElementById(`tempMax_${type}`);

        this.I_min = Infinity;
        this.I_max = -Infinity;
    }

    update(temperatureRaw) {
        const temperature = parseFloat(temperatureRaw);

        if (!this.O_firstValue || isNaN(temperature)) return;

        this.O_firstValue.textContent = temperature;
        this.O_temperatureMeter.setAttribute("value", temperature);
        
        if (temperature < this.I_min) {
            this.I_min = temperature;
            if (this.O_minDisplay) this.O_minDisplay.textContent = this.I_min;
        }
        if (temperature > this.I_max) {
            this.I_max = temperature;
            if (this.O_maxDisplay) this.O_maxDisplay.textContent = this.I_max;
        }

        if (temperature < 0) {
            this.O_elementDiv.className = "capteur-card bordure-bleue";
        } else if (temperature < 20) {
            this.O_elementDiv.className = "capteur-card bordure-verte";
        } else if (temperature < 30) {
            this.O_elementDiv.className = "capteur-card bordure-orange";
        } else {
            this.O_elementDiv.className = "capteur-card bordure-rouge";
        }

        let S_alerte = "";
        if (this.type === "exterieur") {
            if (temperature > 35) S_alerte = "🔥 Hot Hot Hot !";
            else if (temperature < 0) S_alerte = "🧊 Banquise en vue !";
        } else {
            if (temperature > 50) S_alerte = "🚒 Appelez les pompiers ou arrêtez votre barbecue !";
            else if (temperature > 22) S_alerte = "🌡️ Baissez le chauffage !";
            else if (temperature < 0) S_alerte = "🥶 Canalisations gelées, appelez SOS plombier et mettez un bonnet !";
            else if (temperature < 12) S_alerte = "🧥 Montez le chauffage ou mettez un gros pull !";
        }

        if (S_alerte !== "") {
            this.O_commentaire.textContent = S_alerte;
            this.O_commentaire.hidden = false;
            this.O_commentaire.setAttribute("role", "alert");
        } else {
            this.O_commentaire.hidden = true;
        }
    }
}