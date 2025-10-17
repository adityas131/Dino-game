const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const popup = document.getElementById("gameOverPopup");
const playAgainBtn = document.getElementById("playAgainBtn");

let gameInterval;
let isGameOver = false;

function startGame() {
  cactus.style.right = "0px"; // reset cactus
  isGameOver = false;
  popup.style.display = "none";

  if (gameInterval) clearInterval(gameInterval);

  gameInterval = setInterval(() => {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    let cactusRight = parseInt(window.getComputedStyle(cactus).getPropertyValue("right"));

    if (cactusRight > 530 && cactusRight < 570 && dinoTop < 40) {
      isGameOver = true;
      popup.style.display = "block";
      clearInterval(gameInterval);
    }
  }, 10);
}

function jump() {
  if (!dino.classList.contains("jump")) {
    dino.classList.add("jump");
    setTimeout(() => {
      dino.classList.remove("jump");
    }, 600);
  }
}

document.addEventListener("keydown", function(event) {
  if (event.code === "Space") jump();
});

playAgainBtn.addEventListener("click", () => {
  startGame();
});

// start game automatically
startGame();
