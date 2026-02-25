const barraDiRicerca = document.getElementById('cerca-spartito');
const areaRisultati = document.getElementById('area-risultati');

barraDiRicerca.addEventListener('input', function() {
    if (barraDiRicerca.value.length > 0) {
        areaRisultati.style.display = 'block';
    } else {
        areaRisultati.style.display = 'none';
    }
});
