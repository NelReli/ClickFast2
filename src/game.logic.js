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

// on exporte
module.exports = { decrementerTemps, incrementerClics, peutCliquer };