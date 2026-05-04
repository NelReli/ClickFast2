// on importe
const { decrementerTemps, incrementerClics, peutCliquer, getTop5 } = require('../src/game.logic');

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

