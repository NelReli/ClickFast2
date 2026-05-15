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

// on exporte
module.exports = { decrementerTemps, incrementerClics, peutCliquer, getTop5 };

