export class C_gererAlertes {
    constructor() {
        this.historique = [];

        this._injecterUI();
        this._bindEvenements();
    }

    _injecterUI() {
        const cloche = document.createElement("div");
        cloche.id = "alerte-cloche";
        cloche.setAttribute("role", "button");
        cloche.setAttribute("aria-label", "Voir les alertes");
        cloche.setAttribute("tabindex", "0");
        cloche.innerHTML = `
            <span id="alerte-icone">🔔</span>
            <span id="alerte-badge" hidden>0</span>
        `;
        document.body.appendChild(cloche);

        const modale = document.createElement("dialog");
        modale.id = "alerte-modale";
        modale.setAttribute("aria-labelledby", "alerte-titre");
        modale.innerHTML = `
            <div id="alerte-modale-header">
                <h2 id="alerte-titre">⚠️ Alerte température</h2>
                <button id="alerte-fermer" aria-label="Fermer">✕</button>
            </div>
            <div id="alerte-contenu-actuel">
                <p id="alerte-message-actuel"></p>
            </div>
            <details id="alerte-historique-details">
                <summary>Alertes passées (<span id="alerte-compteur">0</span>)</summary>
                <ul id="alerte-liste-historique"></ul>
            </details>
        `;
        document.body.appendChild(modale);

        const style = document.createElement("style");
        style.textContent = `
            /* ── Cloche ── */
            #alerte-cloche {
                position: fixed;
                top: 1rem;
                right: 1rem;
                z-index: 1000;
                cursor: pointer;
                font-size: 1.6rem;
                background: #fff;
                border-radius: 50%;
                width: 3rem;
                height: 3rem;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 8px rgba(0,0,0,0.18);
                transition: transform 0.2s;
                user-select: none;
            }
            #alerte-cloche:hover { transform: scale(1.12); }
            #alerte-cloche.shake {
                animation: cloche-shake 0.5s ease;
            }
            @keyframes cloche-shake {
                0%,100% { transform: rotate(0deg); }
                20%      { transform: rotate(-18deg); }
                40%      { transform: rotate(18deg); }
                60%      { transform: rotate(-12deg); }
                80%      { transform: rotate(12deg); }
            }
            #alerte-badge {
                position: absolute;
                top: -4px;
                right: -4px;
                background: #e53935;
                color: #fff;
                font-size: 0.65rem;
                font-weight: 700;
                border-radius: 50%;
                min-width: 1.1rem;
                height: 1.1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 3px;
            }

            /* ── Modale ── */
            #alerte-modale {
                border: none;
                border-radius: 14px;
                padding: 0;
                max-width: 420px;
                width: 90%;
                box-shadow: 0 8px 32px rgba(0,0,0,0.22);
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                position: fixed;
                margin: 0;
            }
            #alerte-modale::backdrop {
                background: rgba(0,0,0,0.35);
                backdrop-filter: blur(2px);
            }
            #alerte-modale[open] {
                animation: modale-entree 0.25s ease;
            }
            @keyframes modale-entree {
                from { opacity: 0; transform: translate(-50%, -48%) scale(0.95); }
                to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            #alerte-modale-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem 1.25rem 0.5rem;
                border-bottom: 1px solid #f0f0f0;
            }
            #alerte-titre {
                margin: 0;
                font-size: 1.05rem;
            }
            #alerte-fermer {
                background: none;
                border: none;
                font-size: 1.1rem;
                cursor: pointer;
                color: #888;
                padding: 0.2rem 0.4rem;
                border-radius: 6px;
                transition: background 0.15s;
            }
            #alerte-fermer:hover { background: #f0f0f0; color: #333; }
            #alerte-contenu-actuel {
                padding: 1rem 1.25rem;
                font-size: 1rem;
            }
            #alerte-message-actuel {
                margin: 0;
                font-size: 1.05rem;
                line-height: 1.5;
            }
            #alerte-historique-details {
                border-top: 1px solid #f0f0f0;
                padding: 0.75rem 1.25rem 1rem;
            }
            #alerte-historique-details summary {
                cursor: pointer;
                font-size: 0.9rem;
                color: #555;
                padding: 0.25rem 0;
                list-style: none;
            }
            #alerte-historique-details summary::-webkit-details-marker { display: none; }
            #alerte-historique-details summary::before { content: "▶ "; font-size: 0.7rem; }
            #alerte-historique-details[open] summary::before { content: "▼ "; }
            #alerte-liste-historique {
                list-style: none;
                padding: 0;
                margin: 0.5rem 0 0;
                max-height: 180px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 0.4rem;
            }
            #alerte-liste-historique li {
                font-size: 0.85rem;
                padding: 0.4rem 0.6rem;
                background: #fafafa;
                border-radius: 6px;
                border-left: 3px solid #e53935;
                color: #333;
            }
            #alerte-liste-historique li .alerte-heure {
                color: #888;
                font-size: 0.78rem;
                margin-right: 0.4rem;
            }
        `;
        document.head.appendChild(style);
    }

    _bindEvenements() {
        const cloche = document.getElementById("alerte-cloche");
        const modale = document.getElementById("alerte-modale");
        const btnFermer = document.getElementById("alerte-fermer");

        cloche.addEventListener("click", () => {
            this._ouvrirModaleHistorique();
        });
        cloche.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") this._ouvrirModaleHistorique();
        });

        btnFermer.addEventListener("click", () => modale.close());
        modale.addEventListener("click", (e) => {
            if (e.target === modale) modale.close();
        });

        modale.addEventListener("close", () => {
        });
    }

    _ouvrirModaleAlerte(alerte) {
        const modale = document.getElementById("alerte-modale");
        const msgActuel = document.getElementById("alerte-message-actuel");
        const titre = document.getElementById("alerte-titre");

        titre.textContent = "⚠️ Alerte température";
        msgActuel.textContent = `${alerte.emoji} [${alerte.heure}] ${alerte.label} — ${alerte.temperature}°C\n${alerte.message}`;

        this._rafraichirHistoriqueUI();
        modale.showModal();
    }

    _ouvrirModaleHistorique() {
        const modale = document.getElementById("alerte-modale");
        const msgActuel = document.getElementById("alerte-message-actuel");
        const titre = document.getElementById("alerte-titre");
        const details = document.getElementById("alerte-historique-details");

        if (this.historique.length === 0) {
            titre.textContent = "🔔 Alertes";
            msgActuel.textContent = "Aucune alerte pour le moment.";
        } else {
            titre.textContent = "🔔 Alertes passées";
            const derniere = this.historique[this.historique.length - 1];
            msgActuel.textContent = `Dernière : ${derniere.emoji} [${derniere.heure}] ${derniere.label} — ${derniere.temperature}°C`;
            details.open = true;
        }

        this._rafraichirHistoriqueUI();
        modale.showModal();
    }

    _rafraichirHistoriqueUI() {
        const liste = document.getElementById("alerte-liste-historique");
        const compteur = document.getElementById("alerte-compteur");

        compteur.textContent = this.historique.length;
        liste.innerHTML = [...this.historique].reverse().map(a => `
            <li>
                <span class="alerte-heure">${a.heure}</span>
                ${a.emoji} ${a.label} — ${a.temperature}°C : ${a.message}
            </li>
        `).join("");
    }

    _animerCloche() {
        const cloche = document.getElementById("alerte-cloche");
        const badge = document.getElementById("alerte-badge");

        const count = this.historique.length;
        badge.textContent = count > 99 ? "99+" : count;
        badge.hidden = false;

        cloche.classList.remove("shake");
        void cloche.offsetWidth;
        cloche.classList.add("shake");
        cloche.addEventListener("animationend", () => cloche.classList.remove("shake"), { once: true });
    }

    _detecterAnomalies(temperature, type) {
        const label = type === "exterieur" ? "Extérieur" : "Intérieur";
        let message = "";
        let emoji = "⚠️";

        if (type === "exterieur") {
            if (temperature > 35)      { message = "Hot Hot Hot !";         emoji = "🔥"; }
            else if (temperature < 0)  { message = "Banquise en vue !";     emoji = "🧊"; }
        } else {
            if (temperature > 50)      { message = "Appelez les pompiers ou arrêtez votre barbecue !"; emoji = "🚒"; }
            else if (temperature > 22) { message = "Baissez le chauffage !";                           emoji = "🌡️"; }
            else if (temperature < 0)  { message = "Canalisations gelées, appelez SOS plombier et mettez un bonnet !"; emoji = "🥶"; }
            else if (temperature < 12) { message = "Montez le chauffage ou mettez un gros pull !";     emoji = "🧥"; }
        }

        return message ? { label, message, emoji } : null;
    }

    update(valeur, type) {
        const temperature = parseFloat(valeur);
        if (isNaN(temperature)) return;

        const anomalie = this._detecterAnomalies(temperature, type);
        if (!anomalie) return;

        const heure = new Date().toLocaleTimeString("fr-FR");
        const alerte = { heure, type, temperature, ...anomalie };

        this.historique.push(alerte);
        this._animerCloche();
        this._ouvrirModaleAlerte(alerte);
    }
}