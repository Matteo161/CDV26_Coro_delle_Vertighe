<?php 
session_start();
include 'header.php'; 
?>

<section id="hero-public">
    <div class="public-cards-wrapper">
        <a href="#sezione-santuario" class="public-card">
            <h3>Santuario</h3>
        </a>
        <a href="#sezione-coro" class="public-card">
            <h3>Coro</h3>
        </a>
        <a href="#sezione-ffb" class="public-card">
            <h3>FFB</h3>
        </a>
    </div>
</section>

<div class="content-sections-container">
    
    <section id="sezione-santuario" class="info-section">
        <div class="testo-sezione">
            <h2>Santuario S. Maria delle Vertighe</h2>
            <p>Il Santuario di Santa Maria delle Vertighe è un luogo di pace, preghiera e devozione affidato alla cura della Fraternità Francescana di Betania. Vi accogliamo con gioia per celebrare insieme la fede.</p>
            
            <div class="scheda-orari-moderna">
                <div class="orari-header">
                    <svg class="svg-icon" viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <h3>Orari Liturgie</h3>
                </div>
                
                <div class="orario-item">
                    <span class="giorno">Feriale e Prefestivo</span>
                    <span class="ora">07:30 &bull; 18:00</span>
                </div>
                <div class="orario-item">
                    <span class="giorno">Festivo</span>
                    <span class="ora">08:00 &bull; 10:00 &bull; 11:30 &bull; 17:00 &bull;18:00</span>
                </div>
                <div class="orario-item">
                    <span class="giorno">S. Rosario</span>
                    <span class="ora">08:30 &bull; 17:15</span>
                </div>
                <div class="orario-item">
                    <span class="giorno">Vespri</span>
                    <span class="ora">17:45</span>
                </div>
            </div>

        </div>
        <div class="immagine-sezione" style="background-image: url('assets/img/santuario_esterno_2025.jpg');"></div>
    </section>

    <section id="sezione-coro" class="info-section bg-grigio">
        <div class="immagine-sezione" style="background-image: url('assets/img/gruppo_coro_vertighe_2025.jpg');"></div>
        <div class="testo-sezione">
            <h2>Il Coro delle Vertighe</h2>
            <p>Nato nel 2013 per iniziativa della <em>Fraternità Francescana di Betania</em>, il coro custodisce e anima la vita liturgica del Santuario delle Vertighe. La nostra missione è trasformare il canto in preghiera viva, unendo la fede dei coristi alla partecipazione attiva dell'assemblea.</p>
            <p>Il coro presta servizio principalmente durante le celebrazioni domenicali e le solennità del Santuario, spaziando dal canto gregoriano alla polifonia classica e contemporanea.</p>
        </div>
    </section>

    <section id="sezione-ffb" class="info-section">
        <div class="testo-sezione">
            <h2>Fraternità Francescana di Betania</h2>
            <p>La Fraternità Francescana di Betania è un Istituto di Vita Consacrata che vive il carisma francescano con un'attenzione particolare all'accoglienza e alla preghiera, incarnando lo spirito di Betania dove Gesù amava sostare.</p>
            <p>I fratelli e le sorelle della Fraternità custodiscono il Santuario, offrendo a pellegrini e fedeli un'oasi di spiritualità, ascolto profondo e condivisione fraterna.</p>
        </div>
        <div class="immagine-sezione" style="background-image: url('assets/img/fraternita_betania_vertighe_2022.jpg');"></div>
    </section>

</div>

<?php 
include 'footer.php'; 
?>