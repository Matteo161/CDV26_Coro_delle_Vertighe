// Questa è la funzione che viene chiamata quando clicchi un bottone
function apriCassetto(idCassetto) {
    
    // 1. Prima di tutto, chiudiamo (nascondiamo) TUTTI i cassetti
    document.getElementById('home').style.display = 'none';
    document.getElementById('concerti').style.display = 'none';

    // 2. Ora apriamo SOLO il cassetto che hai richiesto cliccando
    document.getElementById(idCassetto).style.display = 'block';
    
}