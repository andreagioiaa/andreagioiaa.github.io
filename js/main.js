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
                <li><a href="contact.html" class="${currentPage === 'contact.html' ? 'active' : ''}">Contatti</a></li>
            </ul>
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

// 3. REGISTRAZIONE DEI COMPONENTI NEL BROWSER
// Il controllo 'if' evita errori se il file viene caricato due volte
if (!customElements.get('sidebar-menu')) {
    customElements.define('sidebar-menu', SidebarMenu);
}

if (!customElements.get('featured-projects')) {
    customElements.define('featured-projects', FeaturedProjects);
}