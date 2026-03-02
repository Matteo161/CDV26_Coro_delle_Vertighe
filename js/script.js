/* =========================================
   CORO DELLE VERTIGHE - SCRIPT PRINCIPALE
   ========================================= */

// --- 1. SELEZIONE ELEMENTI DOM ---
const searchInput = document.getElementById('main-search');
const body = document.body;
const resultsContainer = document.getElementById('results-container');
const bgContainer = document.getElementById('bg-container');

// --- 2. GESTIONE SFONDO ANIMATO ---
const fotoSfondo = [
    "assets/img/santuario_esterno_2025.jpg",
    "assets/img/madonna_vertighe_abside.jpg",
    "assets/img/vertighe_santuario_nico_organo_2021.jpeg",
    "assets/img/santuario_vertighe_chianine.jpg",
    "assets/img/santuario_chiostro_interno.jpg",
    "assets/img/valdichiana_tramonto.jpg"
];

// Inietta i DIV delle foto
fotoSfondo.forEach((foto, index) => {
    const slide = document.createElement('div');
    slide.className = index === 0 ? 'slide active' : 'slide';
    slide.style.backgroundImage = `url('${foto}')`;
    bgContainer.insertBefore(slide, bgContainer.querySelector('.overlay-light'));
});

const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
const slideInterval = 8000; // 8 secondi

function nextSlide() {
    if (slides.length > 1) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}
setInterval(nextSlide, slideInterval);


// --- 3. GESTIONE MENU HAMBURGER ---
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('open');
        });
    });
}


// --- 4. GESTIONE SCROLL (Sfondo e Tasto 'Torna su') ---
const scrollThreshold = 400;
window.addEventListener('scroll', () => {
    if (body.classList.contains('is-searching')) return;

    if (window.scrollY > scrollThreshold / 2) {
        body.classList.add('is-scrolled');
    } else {
        body.classList.remove('is-scrolled');
    }
});


// --- 5. MOTORE DI RICERCA (Area Privata) ---
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length > 0) {
            body.classList.add('is-searching');
            resultsContainer.classList.remove('hidden');
            resultsContainer.innerHTML = ''; 
            
            const trovati = repertorio.filter(canto => 
                canto.titolo.toLowerCase().includes(query) || 
                canto.autore.toLowerCase().includes(query) ||
                canto.id.toLowerCase().includes(query) ||
                (canto.tags && canto.tags.some(tag => tag.includes(query)))
            );

            if (trovati.length > 0) {
                trovati.forEach(canto => {
                    const m = canto.materiali || {}; 
                    let buttonsHtml = '';

                    // --- CREAZIONE BOTTONI CON ICONE SVG INLINE ---
                    // Icona Documento (PDF)
                    const iconPdf = `<svg class="svg-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`;
                    
                    // Icona Musica (Organo)
                    const iconMusic = `<svg class="svg-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`;
                    
                    // Icona Cuffie (Audio Tutti)
                    const iconAudio = `<svg class="svg-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`;

                    if (m.pdf_coro) buttonsHtml += `<a href="${m.pdf_coro}" target="_blank" title="PDF Coro" class="btn-materiale btn-pdf">${iconPdf} Coro</a>`;
                    if (m.pdf_organo) buttonsHtml += `<a href="${m.pdf_organo}" target="_blank" title="PDF Organo" class="btn-materiale btn-pdf">${iconMusic} Organo</a>`;
                    if (m.audio_tutti) buttonsHtml += `<a href="${m.audio_tutti}" target="_blank" title="Audio Tutti" class="btn-materiale btn-audio">${iconAudio} Tutti</a>`;
                    if (m.audio_s) buttonsHtml += `<a href="${m.audio_s}" target="_blank" title="Audio Soprani" class="btn-materiale btn-voce">S</a>`;
                    if (m.audio_c) buttonsHtml += `<a href="${m.audio_c}" target="_blank" title="Audio Contralti" class="btn-materiale btn-voce">C</a>`;
                    if (m.audio_t) buttonsHtml += `<a href="${m.audio_t}" target="_blank" title="Audio Tenori" class="btn-materiale btn-voce">T</a>`;
                    if (m.audio_b) buttonsHtml += `<a href="${m.audio_b}" target="_blank" title="Audio Bassi" class="btn-materiale btn-voce">B</a>`;

                    const card = `
                        <div class="result-card-evolved">
                            <div class="card-header">
                                <span class="tag-numero">${canto.id}</span>
                                <h4>${canto.titolo}</h4>
                            </div>
                            <p class="card-subtitle">${canto.autore} - ${canto.momento}</p>
                            <div class="materiali-grid">${buttonsHtml}</div>
                        </div>
                    `;
                    resultsContainer.innerHTML += card; 
                });
            
            
            } else {
                resultsContainer.innerHTML = `
                    <div class="result-placeholder">
                        <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 15px; color: #99aabd;">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="9" y1="9" x2="13" y2="13"></line>
                            <line x1="13" y1="9" x2="9" y2="13"></line>
                        </svg>
                        <h3>Nessun canto trovato</h3>
                        <p>Prova a cercare un'altra parola o autore.</p>
                    </div>`;
            }


            setTimeout(() => resultsContainer.style.opacity = 1, 10);

        } else {
            body.classList.remove('is-searching');
            resultsContainer.style.opacity = 0;
            
            setTimeout(() => {
                if (searchInput && searchInput.value.length === 0) { 
                     resultsContainer.classList.add('hidden');
                     resultsContainer.innerHTML = `
                        <div class="result-placeholder">
                            <h3>Risultati della ricerca...</h3>
                            <p>Qui appariranno i canti man mano che scrivi.</p>
                        </div>`;
                }
            }, 500);
        }
    });
}