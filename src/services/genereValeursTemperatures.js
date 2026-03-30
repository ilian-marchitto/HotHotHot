export class C_genereValeursTemperatures {
    constructor() {
        this.A_tableau20Valeurs = [];
        for (let i = 0; i < 20; i++) {
            this.A_tableau20Valeurs.push(Math.floor(Math.random() * (40 - (-10)) + -10));
        }
    }

    getTableau20Valeurs() {
        return this.A_tableau20Valeurs;
    }
}