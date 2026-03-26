export class C_gererValeurTempsReel {
    constructor() {
        this.O_firstValue = document.getElementById("O_firstValue");
        this.O_elementDiv = document.getElementById("bordure");
        this.O_commentaire = document.getElementById("commentaire");
        this.O_temperatureMeter = document.getElementById("temperatureMeter");
    }

    // Fonction de mise à jour de l'interface
    update(temperature) {
        this.O_firstValue.textContent = temperature;
        this.O_temperatureMeter.setAttribute("value", temperature);
        this.O_commentaire.hidden = true;

        if (temperature < 0) {
            this.O_commentaire.hidden = false;
            this.O_commentaire.textContent = "Brrrrrrr, un peu froid ce matin, mets ta cagoule !";
            this.O_elementDiv.className = "bordure-bleue";
        } 
        else if (temperature >= 0 && temperature < 20) {
            this.O_elementDiv.className = "bordure-verte";
        } 
        else if (temperature >= 20 && temperature < 30) {
            this.O_elementDiv.className = "bordure-orange";
        } 
        else if (temperature >= 30) {
            this.O_commentaire.hidden = false;
            this.O_commentaire.textContent = "Caliente ! Vamos a la playa, ho hoho hoho !!";
            this.O_elementDiv.className = "bordure-rouge";
        }
    }
}