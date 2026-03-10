/* =========================================
    JAVASCRIPT: COMPONENTI & LOGICA
    (Da spostare in js/main.js)
    ========================================= */

class SidebarMenu extends HTMLElement {
    connectedCallback() {
        // Otteniamo il nome della pagina attuale per evidenziare il link attivo
        const currentPage = window.location.pathname.split("/").pop() || "index.html";

        this.innerHTML = `
            <a href="index.html" class="brand-logo">Andrea <span>Gioia</span></a>
            <ul class="nav-links">
                <li><a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">Home</a></li>
                <li><a href="chi_sono.html" class="${currentPage === 'chi_sono.html' ? 'active' : ''}">Chi sono</a></li>
                <li><a href="projects.html" class="${currentPage === 'projects.html' ? 'active' : ''}">Progetti</a></li>
                <li><a href="blog.html" class="${currentPage === 'blog.html' ? 'active' : ''}">Blog / Appunti</a></li>
                <li><a href="contact.html" class="${currentPage === 'contact.html' ? 'active' : ''}">Contatti</a></li>
            </ul>
            <div class="sidebar-footer">
                <p>📍 Cormons (GO)</p>
                <p>Sys.Status: ONLINE</p>
            </div>
        `;
    }
}

customElements.define('sidebar-menu', SidebarMenu); // tag <sidebar-menu> nativo