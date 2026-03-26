export class sujetSurEcoute {
    constructor() {
        this.observers = [];
        this.currentData = null;
    }

    // On ajoute un observateur
    subscribe(observer) {
        this.observers.push(observer);
    }

    // On notifie tout le monde
    notify() {
        this.observers.forEach(observer => observer.update(this.currentData.valeur, 10));
    }
    
    nouvelleMesure(valeur, type, nom, timestamp) {
        this.currentData = {
            valeur: parseFloat(valeur),
            type: type,
            nom: nom,
            timestamp: timestamp
        };
        
        this.notify();
    }

    getCurrentData() {
        return this.currentData;
    }
}