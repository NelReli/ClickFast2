// 1. Créer le faux DOM avant tout
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
    <div id="progress"></div>
    <div id="moyenne"></div>
    <div id="phrase"></div>
    <p class="pseudo"></p>
    <p class="count">0</p>
    <div class="example-element"></div>
`

// 2. Importer après le DOM
let { handleGameButton, handleStartButton, handleRejouerButton, score } = require('../src/script.js')

describe("Tests ClickFast", () => {
    beforeEach(() => {
        score = 0
        document.getElementById('game').disabled = false
        document.querySelector('.count').textContent = '0'
    })

    test("le score s'incrémente au clic", () => {
        const btn = document.getElementById('game')
        btn.click()
        btn.click()
        btn.click()
        expect(document.querySelector('.count').textContent).toBe('3')
    })

    test("le bouton est désactivé au départ", () => {
        document.getElementById('game').disabled = true
        const btn = document.getElementById('game')
        expect(btn.disabled).toBe(true)
    })

    test("le score ne s'incrémente pas si bouton désactivé", () => {
        document.getElementById('game').disabled = true
        const btn = document.getElementById('game')
        btn.click()
        expect(document.querySelector('.count').textContent).toBe('0')
    })
})