// on importe
const { decrementerTemps, incrementerClics, peutCliquer, getTop5, getPseudo, getMoyenne, getPhrase } = require('../src/game.logic');

test('verification decrementation du temps', () => {
    expect(decrementerTemps(10)).toBe(9);
    expect(decrementerTemps(0)).toBe(0);
});

test('verification incrementation du score', () => {
    expect(incrementerClics(0)).toBe(1);
    expect(incrementerClics(10)).toBe(11);
});

test('verification clique apres temps ecouler', () => {
    expect(peutCliquer(5)).toBe(true);
    expect(peutCliquer(0)).toBe(false);
});

test('verification affichage 5meilleur scores', () => {
    expect(getTop5([10, 45, 3, 67, 28, 92, 15])).toEqual([92, 67, 45, 28, 15]);
});

test('pseudo vide retourne Anonyme', () => {
    expect(getPseudo('')).toBe('Anonyme')
    expect(getPseudo('   ')).toBe('Anonyme')
    expect(getPseudo('John')).toBe('John')
})

test('calcul moyenne clics par seconde', () => {
    expect(getMoyenne(20, 5)).toBe(4)
    expect(getMoyenne(0, 5)).toBe(0)
})

test('message de fin selon le score', () => {
    expect(getPhrase(35)).toBe('Incroyable ! Tu es une machine !')
    expect(getPhrase(25)).toBe('Excellent ! Réflexes de pro !')
    expect(getPhrase(15)).toBe('Bien joué ! Tu peux faire mieux !')
    expect(getPhrase(5)).toBe('Bonne première tentative !')
})