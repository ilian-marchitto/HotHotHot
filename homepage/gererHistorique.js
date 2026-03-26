export class C_gererHistorique {
    constructor() {
        this.O_historique = document.getElementById("historique");
    }
    
    // Fonction pour ajouter une température à l'historique
    update(temperature) {
        this.O_historique.innerHTML += "<li>" + temperature + "°C</li>";
    }
}