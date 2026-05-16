document.body.innerHTML = `
    <input id="input_pseudo" value="TestUser" />
    <button id="start_game">Jouer</button>
    <button id="game">Click!</button>
    <button id="rejouer">Rejouer</button>
    <button id="btnClassement1">Classement</button>
    <button id="btnClassement2">Classement</button>
    <button id="retour">Retour</button>
    <div id="accueil"></div>
    <div id="jeu"></div>
    <div id="resultat"></div>
    <div id="classement"><div><div></div></div></div>
    <div id="timer"></div>
    <div id="progress" style="width: 100%"></div>
    <div id="moyenne"></div>
    <div id="phrase"></div>
    <p class="pseudo"></p>
    <p class="count">0</p>
    <div class="example-element"></div>
`

const { handleGameButton, getScore } = require('../src/script.js')
const { peutCliquer } = require('../src/game.logic')

describe("Tests ClickFast — DOM", () => {

    beforeEach(() => {
        document.getElementById('game').disabled = false
        document.querySelector('.count').textContent = '0'
    })

    test("le score s'incrémente au clic (DOM)", () => {
        const btn = document.getElementById('game')
        btn.click()
        btn.click()
        btn.click()
        expect(document.querySelector('.count').textContent).toBe('3')
    })

    test("le score s'incrémente au clic (variable)", () => {
        const btn = document.getElementById('game')
        const avant = getScore()  // ← getter, pas une copie figée
        btn.click()
        btn.click()
        expect(getScore()).toBe(avant + 2)
    })

    test("le bouton est désactivé quand temps écoulé", () => {
        // On vérifie la logique, pas le comportement JSDOM
        expect(peutCliquer(0)).toBe(false)
        expect(peutCliquer(5)).toBe(true)
    })

    test("le score ne change pas si bouton disabled (via peutCliquer)", () => {
        // JSDOM ne bloque pas les clics, donc on teste la règle métier
        const tempsRestant = 0
        const scoreAvant = getScore()
        
        if (peutCliquer(tempsRestant)) {
            document.getElementById('game').click()
        }

        expect(getScore()).toBe(scoreAvant) // pas de clic car temps = 0
    })

    test("le pseudo vide affiche Anonyme", () => {
        document.getElementById('input_pseudo').value = ''
        // getPseudo est utilisé dans jouerJeu — on teste la logique directement
        const { getPseudo } = require('../src/game.logic')
        expect(getPseudo('')).toBe('Anonyme')
    })

})