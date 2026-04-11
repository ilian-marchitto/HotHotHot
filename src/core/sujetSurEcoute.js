export class sujetSurEcoute {
    constructor() {
        this.observers = [];
        this.currentData = null;
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    notify() {
        this.observers.forEach(observer => {
            observer.update(this.currentData.valeur, this.currentData.nom);
        });
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
}