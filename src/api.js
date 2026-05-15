const API_URL = "https://672e1217229a881691eed80f.mockapi.io/scores"

async function sauvegarderScoreAPI(pseudo, score) {
    const response = await fetch(API_URL)
    const users = await response.json()
    const usersToDelete = users.filter(user => user.username === pseudo)

    for (const user of usersToDelete) {
        await fetch(`${API_URL}/${user.id}`, { method: "DELETE" })
    }

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            createdAt: new Date().toISOString(),
            username: pseudo,
            score: score,
            website_url: "onyj.github.io/ClickFast"
        })
    })
}

async function afficherClassement() {
    try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error('API indisponible')
        const scores = await response.json()
        const top5 = scores.sort((a, b) => b.score - a.score).slice(0, 5)
        afficherScores(top5, 'username')
    } catch {
        const scores = JSON.parse(localStorage.getItem('scores')) || []
        afficherScores(scores, 'pseudo')
    }
}

function afficherScores(scores, champPseudo) {
    const classementDiv = document.querySelector('#classement div div')
    classementDiv.innerHTML = ''

    scores.forEach((entry, index) => {
        classementDiv.innerHTML += `
            <div class="border border-secondary rounded d-flex justify-content-between p-2 mb-3">
                <span style="gap: 1rem; display: flex;">#${index + 1}<span> ${entry[champPseudo]}</span></span>
                <span style="gap: 1rem; display: flex;">
                    <span class="text-danger fw-bold">${entry.score} clics</span>
                    <span>${new Date(entry.createdAt || Date.now()).toLocaleDateString('fr-FR')}</span>
                </span>
            </div>
        `
    })
}