let temps = 10;
const timerElement = document.getElementById("timer");
const congratulations = document.getElementById("congratulations");
setInterval(() => {
  timerElement.innerText = `${temps}`;
  temps = temps <= 0 ? 0 : temps - 1
  if (temps === 0 ){
    if (total_click > 30){
      congratulations.innerText = `Bravo, vous avez cummulé ${total_click} clique en 10 secondes`;
    } else {
        congratulations.innerText = `Vous pouvez faire mieux`;
    }
  };
}, 1000);

let count_click = document.getElementById("count");
let number_click = document.getElementById("number_click");
let total_click = 0;
number_click.addEventListener("click", function (e) {
  if (temps > 0) {
    total_click ++;
    count_click.innerText = `${total_click}`;
  }
});

