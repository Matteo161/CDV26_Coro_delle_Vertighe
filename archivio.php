<?php
session_start(); // Inizia a ricordare chi è l'utente

// Definiamo le credenziali
$username_coro = "corista";
$password_coro = "ADV2026";

// Logica per il Logout
if (isset($_GET['action']) && $_GET['action'] == 'logout') {
    session_destroy();
    header("Location: archivio.php");
    exit;
}

// Logica per il Login
$errore = "";
if (isset($_POST['login'])) {
    if ($_POST['username'] == $username_coro && $_POST['password'] == $password_coro) {
        $_SESSION['autorizzato'] = true;
    } else {
        $errore = "Credenziali errate, riprova.";
    }
}

// Richiamiamo l'intestazione grafica (che contiene già le foto e il menu)
include 'header.php'; 
?>

<section id="hero">
    <div class="search-wrapper-container">
        <?php if (isset($_SESSION['autorizzato']) && $_SESSION['autorizzato'] === true): ?>
            <input type="text" id="main-search" placeholder="Cerca spartiti, audio, autori...">
            <p id="main-motto" style="font-family: 'Montserrat', sans-serif; font-size: 0.9rem; margin-top: 15px;">
                Benvenuto nell'area riservata - <a href="?action=logout" style="color:var(--colore-primario); font-weight:600; text-decoration:none;">ESCI</a>
            </p>
        <?php else: ?>
            <div id="login-box">
                <form method="POST" action="archivio.php" class="login-form">
                    <input type="text" name="username" placeholder="Nome Corista" required class="login-input">
                    <input type="password" name="password" placeholder="Password" required class="login-input">
                    <button type="submit" name="login" class="login-button">Entra nell'Archivio</button>
                </form>
                <?php if($errore): ?>
                    <p class="error-message"><?php echo $errore; ?></p>
                <?php endif; ?>
            </div>
            <p id="main-motto">Area Riservata Coristi</p>
        <?php endif; ?>
    </div>
</section>

<div id="results-container" class="hidden">
    <div class="result-placeholder">
        <h3>Risultati della ricerca...</h3>
        <p>Qui appariranno i canti man mano che scrivi.</p>
    </div>
</div>

<?php 
// Chiudiamo la pagina con il Piè di pagina
include 'footer.php'; 
?>