/* =========================================
   JS: DESIGN SYSTEM COMPONENTI
   Architettura modulare per il Portfolio
   ========================================= */

// 1. COMPONENTE: SIDEBAR MENU
class SidebarMenu extends HTMLElement {
    connectedCallback() {
        const currentPage = window.location.pathname.split("/").pop() || "index.html";

        this.innerHTML = `
            <a href="index.html" class="brand-logo">Andrea <span>Gioia</span></a>
            <ul class="nav-links">
                <li><a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">Home</a></li>
                <li><a href="chi_sono.html" class="${currentPage === 'chi_sono.html' ? 'active' : ''}">Chi Sono</a></li>
                <li><a href="projects.html" class="${currentPage === 'projects.html' ? 'active' : ''}">Progetti</a></li>
                <li><a href="competenze.html" class="${currentPage === 'competenze.html' ? 'active' : ''}">Competenze</a></li>
                <li><a href="red.html" class="${currentPage === 'red.html' ? 'active' : ''}">R&D Personale</a></li>
                <li><a href="contact.html" class="${currentPage === 'contact.html' ? 'active' : ''}">Contatti</a></li>
            </ul>

            <div class="sidebar-cta">
                <download-cv></download-cv>
            </div>

            <div class="sidebar-footer">
                <p>📍 Cormons (GO)</p>
                <p>Sys.Status: ONLINE</p>
            </div>
        `;
    }
}

// 2. COMPONENTE: PROGETTI IN EVIDENZA
class FeaturedProjects extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section>
                <h2 style="margin-bottom: 1.5rem; font-size: 2rem;">In Evidenza</h2>
                <div class="grid-cards">
                    
                    <!-- Card Progetto Vibe Manager -->
                    <a href="projects/vibe-manager.html" target="_blank" class="card">
                        <h3>Vibe Manager <span>⚡</span></h3>
                        <p>Un sistema IoT distribuito per il monitoraggio e la gestione ambientale. Architettura basata su Raspberry Pi 5 come nodo centrale, ZimaBoard per l'elaborazione dati e Pi Zero come sensori edge.</p>
                        <span class="tag">Hardware & C/Python</span>
                    </a>

                    <!-- Card Ricerca IUM -->
                    <a href="projects/hci-research.html" target="_blank" class="card">
                        <h3>Human-Computer Interaction <span>🧠</span></h3>
                        <p>Applicazione dei principi di usabilità (Nielsen), design responsivo e psicologia cognitiva allo sviluppo di interfacce utente. Come la mente umana processa le informazioni a schermo.</p>
                        <span class="tag">UX/UI Research</span>
                    </a>

                </div>
            </section>
        `;
    }
}

class DownloadCV extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <a href="assets/CV_Gioia_Andrea.pdf" download="CV_Gioia_Andrea.pdf" target="_blank" rel="noopener noreferrer" class="btn-download">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Scarica il mio Curriculum
            </a>
        `;
    }
}

// 3. REGISTRAZIONE DEI COMPONENTI NEL BROWSER
// Il controllo 'if' evita errori se il file viene caricato due volte
if (!customElements.get('sidebar-menu')) {
    customElements.define('sidebar-menu', SidebarMenu);
}

if (!customElements.get('featured-projects')) {
    customElements.define('featured-projects', FeaturedProjects);
}

if (!customElements.get('download-cv')) {
    customElements.define('download-cv', DownloadCV);
}




function calcolaEta() {
    // La tua data di nascita: 29 Luglio 2002
    const dataNascita = new Date('2002-07-29');
    const oggi = new Date();
    
    // Calcolo base della differenza di anni
    let eta = oggi.getFullYear() - dataNascita.getFullYear();
    const differenzaMesi = oggi.getMonth() - dataNascita.getMonth();
    
    // Se il mese corrente è precedente al mese di nascita, 
    // o se siamo nello stesso mese ma il giorno non è ancora arrivato,
    // sottraiamo un anno perché il compleanno non è ancora passato.
    if (differenzaMesi < 0 || (differenzaMesi === 0 && oggi.getDate() < dataNascita.getDate())) {
        eta--;
    }
    
    return eta;
}

// Inseriamo l'età calcolata nello span con id "eta"
document.getElementById('eta').textContent = calcolaEta();
