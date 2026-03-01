<?php 
session_start();
include 'header.php'; 
?>

<section id="hero-public">
    <div class="public-cards-wrapper">
        <a href="#sezione-coro" class="public-card">
            <h3>Coro</h3>
        </a>
        <a href="#sezione-ffb" class="public-card">
            <h3>FFB</h3>
        </a>
        <a href="#sezione-santuario" class="public-card">
            <h3>Santuario</h3>
        </a>
    </div>
</section>

<div class="content-sections-container">
    
    <section id="sezione-coro" class="info-section">
        <div class="testo-sezione">
            <h2>Il Coro delle Vertighe</h2>
            <p>Qui potrai inserire la storia del coro, da quanti anni cantate insieme, i nomi dei direttori, lo stile del vostro repertorio. Un bel paragrafo accogliente per chi vuole conoscervi.</p>
        </div>
        <div class="immagine-sezione" style="background-image: url('assets/img/foto_coro.jpg');"></div>
    </section>

    <section id="sezione-ffb" class="info-section bg-grigio">
        <div class="immagine-sezione" style="background-image: url('assets/img/foto_ffb.jpg');"></div>
        <div class="testo-sezione">
            <h2>La Fraternità Francescana di Betania</h2>
            <p>Qui puoi raccontare il carisma della Fraternità, la spiritualità francescana e il legame profondo che unisce il coro alla vita dei frati e delle suore.</p>
        </div>
    </section>

    <section id="sezione-santuario" class="info-section">
        <div class="testo-sezione">
            <h2>Santuario S. Maria delle Vertighe</h2>
            <p>Informazioni sul Santuario, orari delle Messe, indirizzo, e cenni storici sull'edificio e la devozione mariana.</p>
        </div>
        <div class="immagine-sezione" style="background-image: url('assets/img/santuario_esterno_2025.jpg');"></div>
    </section>

</div> <?php 
include 'footer.php'; 
?>