export class C_gererHistorique {
    constructor() {
        this.O_historique = document.getElementById("historique");
        const ctx = document.getElementById("graphiqueSynthese");
        if (ctx) {
            this.chart = new Chart(ctx, {
                type: 'bar', 
                data: {
                    labels: [],
                    datasets: [
                        { label: 'Intérieur', data: [], backgroundColor: 'orange' },
                        { label: 'Extérieur', data: [], backgroundColor: '#3b82f6' }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { y: { beginAtZero: false } }
                }
            });
        }
    }

    update(temperature, nomRecu) {
        const date = new Date().toLocaleTimeString("fr-FR");
        const tempVal = parseFloat(temperature);

        if (this.chart) {
            let labels = this.chart.data.labels;
            let datasetIndex = (nomRecu === "interieur") ? 0 : 1;

            if (labels[labels.length - 1] !== date) {
                labels.push(date);
                if (this.chart.data.datasets[0].data.length < labels.length) this.chart.data.datasets[0].data.push(null);
                if (this.chart.data.datasets[1].data.length < labels.length) this.chart.data.datasets[1].data.push(null);
            }

            const lastIdx = labels.length - 1;
            this.chart.data.datasets[datasetIndex].data[lastIdx] = tempVal;

            if (labels.length > 10) {
                labels.shift();
                this.chart.data.datasets[0].data.shift();
                this.chart.data.datasets[1].data.shift();
            }
            this.chart.update('none');
        }

        if (this.O_historique) {
            const label = nomRecu === "exterieur" ? "Extérieur" : "Intérieur";
            const li = document.createElement("li");
            li.innerHTML = `<strong>[${date}]</strong> ${label} : ${tempVal}°C`;
            this.O_historique.prepend(li);
            if (this.O_historique.children.length > 20) {
                this.O_historique.removeChild(this.O_historique.lastChild);
            }
        }
    }
}