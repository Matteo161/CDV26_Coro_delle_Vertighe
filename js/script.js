/* =========================================
   CORO DELLE VERTIGHE - SCRIPT PRINCIPALE
   ========================================= */

// --- 1. SELEZIONE ELEMENTI DOM E CARICAMENTO FOTO ---
const searchInput = document.getElementById('main-search');
const body = document.body;
const resultsContainer = document.getElementById('results-container');
const bgContainer = document.getElementById('bg-container');


// LA TUA LISTA DELLA SPESA DELLE FOTO (Aggiungi o togli qui in futuro)
const fotoSfondo = [
    "assets/img/santuario_esterno_2025.jpg",
    "assets/img/madonna_vertighe_abside.jpg",
    "assets/img/vertighe_santuario_nico_organo_2021.jpeg",
    "assets/img/santuario_vertighe_chianine.jpg",
    "assets/img/santuario_chiostro_interno.jpg",
    "assets/img/valdichiana_tramonto.jpg"
];


// Inietta i DIV delle foto nell'HTML
fotoSfondo.forEach((foto, index) => {
    const slide = document.createElement('div');
    // La prima foto riceve subito la classe 'active'
    slide.className = index === 0 ? 'slide active' : 'slide';
    slide.style.backgroundImage = `url('${foto}')`;
    // Inserisce la foto prima dell'overlay-light
    bgContainer.insertBefore(slide, bgContainer.querySelector('.overlay-light'));
});

// Ora che le foto sono nell'HTML, diciamo al JS di "catturarle"
const slides = document.querySelectorAll('.slide');




// --- 2. MOTORE DI RICERCA E CREAZIONE CARD ---
searchInput.addEventListener('input', (e) => {
    // Legge il testo digitato, lo converte in minuscolo e toglie gli spazi extra
    const query = e.target.value.toLowerCase().trim();
    
    // CASO A: L'utente ha scritto qualcosa
    if (query.length > 0) {
        body.classList.add('is-searching'); // Attiva le animazioni CSS (la barra vola su)
        resultsContainer.classList.remove('hidden'); // Rende visibile l'area risultati
        resultsContainer.innerHTML = ''; // Pulisce i risultati della ricerca precedente
        
        // Filtra il repertorio (cerca in titolo, autore, ID o nei tags)
        const trovati = repertorio.filter(canto => 
            canto.titolo.toLowerCase().includes(query) || 
            canto.autore.toLowerCase().includes(query) ||
            canto.id.toLowerCase().includes(query) ||
            (canto.tags && canto.tags.some(tag => tag.includes(query)))
        );

        // Se ha trovato almeno un canto, costruisce le "Card Evolute"
        if (trovati.length > 0) {
            trovati.forEach(canto => {
                // Recupera i materiali del canto (con controllo di sicurezza se mancano)
                const m = canto.materiali || {}; 
                let buttonsHtml = '';

                // Aggiunge un bottone SOLO se il link esiste nel database.js
                if (m.pdf_coro) buttonsHtml += `<a href="${m.pdf_coro}" target="_blank" title="PDF Coro" class="btn-materiale btn-pdf">📄 Coro</a>`;
                if (m.pdf_organo) buttonsHtml += `<a href="${m.pdf_organo}" target="_blank" title="PDF Organo" class="btn-materiale btn-pdf">🎹 Organo</a>`;
                if (m.audio_tutti) buttonsHtml += `<a href="${m.audio_tutti}" target="_blank" title="Audio Tutti" class="btn-materiale btn-audio">🎧 Tutti</a>`;
                if (m.audio_s) buttonsHtml += `<a href="${m.audio_s}" target="_blank" title="Audio Soprani" class="btn-materiale btn-voce">S</a>`;
                if (m.audio_c) buttonsHtml += `<a href="${m.audio_c}" target="_blank" title="Audio Contralti" class="btn-materiale btn-voce">C</a>`;
                if (m.audio_t) buttonsHtml += `<a href="${m.audio_t}" target="_blank" title="Audio Tenori" class="btn-materiale btn-voce">T</a>`;
                if (m.audio_b) buttonsHtml += `<a href="${m.audio_b}" target="_blank" title="Audio Bassi" class="btn-materiale btn-voce">B</a>`;

                // Costruisce la struttura HTML della singola Card
                const card = `
                    <div class="result-card-evolved">
                        <div class="card-header">
                            <span class="tag-numero">${canto.id}</span>
                            <h4>${canto.titolo}</h4>
                        </div>
                        <p class="card-subtitle">${canto.autore} - ${canto.momento}</p>
                        <div class="materiali-grid">
                            ${buttonsHtml}
                        </div>
                    </div>
                `;
                // Inserisce la card nella pagina
                resultsContainer.innerHTML += card; 
            });
        } 
        // Se la ricerca non produce risultati
        else {
            resultsContainer.innerHTML = `
                <div class="result-placeholder">
                    <h3>Nessun canto trovato 😔</h3>
                    <p>Prova a cercare un'altra parola o autore.</p>
                </div>
            `;
        }
        
        // Piccolo ritardo per permettere all'animazione CSS di dissolvenza di partire
        setTimeout(() => resultsContainer.style.opacity = 1, 10);

    } 
    // CASO B: L'utente ha cancellato tutto (barra tornata vuota)
    else {
        body.classList.remove('is-searching'); // Disattiva le animazioni (la barra scende)
        resultsContainer.style.opacity = 0; // Inizia la dissolvenza in uscita dei risultati
        
        // Aspetta mezzo secondo per far finire la dissolvenza, poi nasconde e ripristina
        setTimeout(() => {
            if (searchInput.value.length === 0) { // Doppio controllo di sicurezza
                 resultsContainer.classList.add('hidden');
                 // Ripristina il messaggio iniziale ("Chi state cercando...?")
                 resultsContainer.innerHTML = `
                    <div class="result-placeholder">
                        <h3>Risultati della ricerca...</h3>
                        <p>Qui appariranno i canti man mano che scrivi.</p>
                    </div>
                 `;
            }
        }, 500);
    }
});

// --- 3. GESTIONE SCROLL (Sfumatura sfondo e apparizione dei 3 bottoni) ---
const scrollThreshold = 400; // Pixel di scorrimento necessari per completare l'effetto

window.addEventListener('scroll', () => {
    // Se stiamo cercando, blocca l'effetto dello scroll (la priorità è ai risultati)
    if (body.classList.contains('is-searching')) return;

    const scrollPosition = window.scrollY;

    // Se l'utente ha scrollato oltre la metà della soglia
    if (scrollPosition > scrollThreshold / 2) {
        body.classList.add('is-scrolled'); // Mostra i 3 bottoni e sfoca lo sfondo
    } else {
        body.classList.remove('is-scrolled'); // Torna alla Home pulita
    }
});



// --- 4. SLIDER FOTO AUTOMATICO (Sfondo animato) ---

let currentSlide = 0;
const slideInterval = 8000; // Ti consiglio 8 secondi per goderti il paesaggio!

function nextSlide() {
    if (slides.length > 1) { // Gira solo se ci sono almeno 2 foto
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}
setInterval(nextSlide, slideInterval);





