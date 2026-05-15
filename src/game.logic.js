// Décrémenter le temps
function decrementerTemps(temps) {
    return temps <= 0 ? 0 : temps - 1;
}

// Incrémenter les clics
function incrementerClics(total) {
    return total + 1;
}

function peutCliquer(temps) {
    return temps > 0
}

function getTop5(scores) {
    scores.sort((a, b) => b - a); 
    return scores.slice(0, 5);
}

function getPseudo(valeur) {
    return valeur.trim() === '' ? 'Anonyme' : valeur.trim()
}

function getMoyenne(score, duree) {
    return score / duree
}

function getPhrase(score) {
    if (score > 30) return 'Incroyable ! Tu es une machine !'
    if (score > 20) return 'Excellent ! Réflexes de pro !'
    if (score > 10) return 'Bien joué ! Tu peux faire mieux !'
    return 'Bonne première tentative !'
}

if (typeof window !== 'undefined') {
    window.getPseudo = getPseudo
    window.getMoyenne = getMoyenne
    window.getPhrase = getPhrase
}

// on exporte
module.exports = { decrementerTemps, incrementerClics, peutCliquer, getTop5, getPseudo, getMoyenne, getPhrase };

