// Supprimer les require en haut du fichier
// et les mettre dans un beforeEach

let handleGameButton, getScore, peutCliquer

beforeEach(() => {
    // Remettre le DOM à zéro
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

    // Vider le cache des modules pour repartir à zéro
    jest.resetModules()

    // Réimporter à chaque test
    const script = require('../src/script.js')
    const logic = require('../src/game.logic')
    handleGameButton = script.handleGameButton
    getScore = script.getScore
    peutCliquer = logic.peutCliquer
})

describe("Tests ClickFast — DOM", () => {

    test("le score s'incrémente au clic (DOM)", () => {
        const btn = document.getElementById('game')
        btn.click()
        btn.click()
        btn.click()
        expect(document.querySelector('.count').textContent).toBe('3')
    })

    test("le score s'incrémente au clic (variable)", () => {
        const btn = document.getElementById('game')
        const avant = getScore()
        btn.click()
        btn.click()
        expect(getScore()).toBe(avant + 2)
    })

    test("le bouton est désactivé quand temps écoulé", () => {
        expect(peutCliquer(0)).toBe(false)
        expect(peutCliquer(5)).toBe(true)
    })

    test("le score ne change pas si bouton disabled", () => {
        const tempsRestant = 0
        const scoreAvant = getScore()
        
        if (peutCliquer(tempsRestant)) {
            document.getElementById('game').click()
        }

        expect(getScore()).toBe(scoreAvant)
    })

    test("le pseudo vide affiche Anonyme", () => {
        const { getPseudo } = require('../src/game.logic')
        expect(getPseudo('')).toBe('Anonyme')
    })

})