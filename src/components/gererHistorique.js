export class C_gererHistorique {
    constructor() {
        this.O_historique = document.getElementById("historique");
    }

    update(temperature, type) {
        if (!this.O_historique) return;
        const label = type === "exterieur" ? "Extérieur" : "Intérieur";
        const date = new Date().toLocaleTimeString("fr-FR");
        this.O_historique.innerHTML += `<li>[${date}] ${label} : ${temperature}°C</li>`;
    }
}