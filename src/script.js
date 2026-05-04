const DUREE = 5;
let temps;
let total_click;

const timerElement = document.getElementById("timer");
const congratulations = document.getElementById("congratulations");
let count_click = document.getElementById("count");
let number_click = document.getElementById("number_click");
const game = document.getElementById("game");
const rejouer = document.getElementById("rejouer");


function demarrerJeu(){
    temps = 5;
    total_click = 0;
    game.style.display = 'none';
    rejouer.style.display = 'none';
    number_click.style.display = 'block';
    congratulations.innerText = '';
    count_click.innerText = '';
    timerElement.innerText = temps;

    const interval = setInterval(() => {

      timerElement.innerText = temps;
      temps = temps <= 0 ? 0 : temps - 1

      if (temps === 0 ){
        clearInterval(interval); // Arrêter le timer
        number_click.style.display = 'none';
        rejouer.style.display = 'block';
        timerElement.innerText = '';
        congratulations.innerText = `Bravo, vous avez cummulé ${total_click} clique en ${DUREE} secondes`;
        meilleur_scores();
      };

    }, 1000);
}

  number_click.addEventListener("click", function () {
    if (temps > 0) {
      total_click ++;
      count_click.innerText = total_click;
    }
    return total_click;
  });

function meilleur_scores(){
  // Récupérer les scores existants
  const scores = JSON.parse(localStorage.getItem('scores')) || [];

  // Ajouter le nouveau score
  scores.push(total_click);

  // Sauvegarder
  localStorage.setItem('scores', JSON.stringify(scores));
  scores.sort((a, b) => b - a); // du plus grand au plus petit
  const TOP5 = scores.slice(0, 5);           // garder les 5 premiers
  const list = document.getElementById("list");
  list.innerHTML = '';
  for (let i=0; i<TOP5.length; i++){
      let li=document.createElement("li")
        li.textContent=TOP5[i]
        list.appendChild(li)
    }
}

game.addEventListener("click", demarrerJeu);
rejouer.addEventListener("click", demarrerJeu);
console.log (meilleur_scores());
