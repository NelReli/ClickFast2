const start_game = document.getElementById('start_game')
const accueil = document.getElementById('accueil')
const jeu = document.getElementById('jeu')
let balisePseudo = document.getElementById('input_pseudo')
let pseudo = document.querySelectorAll('.pseudo')

const timer = document.getElementById('timer')
const progress = document.getElementById('progress')
const count = document.querySelectorAll('.count')
const game = document.getElementById('game')
const resultat = document.getElementById('resultat')
const moyenne = document.getElementById('moyenne')
const phrase = document.getElementById('phrase')
const rejouer = document.getElementById('rejouer')
const classement = document.getElementById('classement')
const btnClassement1 = document.getElementById('btnClassement1')
const btnClassement2 = document.getElementById('btnClassement2')
const retour = document.getElementById('retour')

progress.style.width = '100%'
accueil.classList.add('active')

let score = 0
let tempsRestant = 0

function handleStartButton() {
    start_game.addEventListener('click', () => {
        accueil.classList.remove('active')
        jeu.classList.add('active')
        game.disabled = false
        jouerJeu()
    })
}

function changerSection(cacher, montrer) {
    cacher.classList.remove('active')
    montrer.classList.add('active')
}

async function jouerJeu() {
    score = 0
    tempsRestant = 5
    timer.textContent = tempsRestant
    count.forEach(el => { el.textContent = score })
    progress.style.width = '100%'

    pseudo.forEach(el => {
        el.textContent = getPseudo(balisePseudo.value.trim())
    })

    let interval = setInterval(() => {
        tempsRestant--
        timer.textContent = tempsRestant
        progress.style.width = ((tempsRestant - 1) / 5 * 100) + '%'

        if (tempsRestant <= 0) {
            clearInterval(interval)
            game.disabled = true
            moyenne.textContent = `${getMoyenne(score, 5)} clics / seconde`

            phrase.textContent = getPhrase(score)

            sauvegarderScore(balisePseudo.value.trim() || 'Anonyme', score)

            sauvegarderScoreAPI(balisePseudo.value.trim() || 'Anonyme', score)

            setTimeout(() => {
                changerSection(jeu, resultat)
                progress.style.width = '100%'
            }, 100)
        }
    }, 1000)
}

function handleGameButton() {
    game.addEventListener('click', () => {
        score++
        count.forEach(el => { el.textContent = score })
    })
}

const example = document.querySelector(".example-element")
example.addEventListener("click", () => {
    example.style.transform = "scale(1.1)"
    setTimeout(() => {
        example.style.transform = "scale(1)"
    }, 100)
})

function handleRejouerButton() {
    rejouer.addEventListener('click', () => {
        changerSection(resultat, jeu)
        game.disabled = false
        jouerJeu()
    })
}

btnClassement1.addEventListener('click', () => {
    changerSection(accueil, classement)
    afficherClassement() 
})

btnClassement2.addEventListener('click', () => {
    changerSection(resultat, classement)
    afficherClassement() 
})

retour.addEventListener('click', () => {
    changerSection(classement, accueil)
})

function sauvegarderScore(pseudo, score) {
    let scores = JSON.parse(localStorage.getItem('scores')) || []
    scores.filter(entry => entry !== null)
    scores.push({ pseudo, score, date: new Date().toLocaleDateString('fr-FR') })
    scores.sort((a, b) => b.score - a.score) // tri décroissant
    scores = scores.slice(0, 5) // garde les 5 meilleurs
    localStorage.setItem('scores', JSON.stringify(scores))
}

handleStartButton()
handleGameButton()
handleRejouerButton()

if (typeof module !== 'undefined') {
    module.exports = { handleStartButton, handleGameButton, handleRejouerButton, jouerJeu, score }
}

// function afficherClassement() {
//     let scores = JSON.parse(localStorage.getItem('scores')) || []
//     const classementDiv = document.querySelector('#classement div div')
//     classementDiv.innerHTML = ''
    
//     scores.forEach((entry, index) => {
//         classementDiv.innerHTML += `
//             <div class="border border-secondary rounded dflex justify-content-between p-2 mb-3 color">
//                 <span style="gap: 1rem; display: flex;">#${index + 1}<span> ${entry.pseudo}</span></span>
//                 <span style="gap: 1rem; display: flex; align-items: center;"><span class="text-danger fw-bold" >${entry.score} clics</span>
//                 <span style="font-size: 0.6rem">${entry.date}</span></span>
//             </div>
//         `
//     })
// }