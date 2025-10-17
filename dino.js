const dino = document.getElementById("dino");
  const cactus = document.getElementById("cactus");
  const gameOverPopup = document.getElementById("gameOverPopup");
  const playAgainBtn = document.getElementById("playAgainBtn");
  const scoreElement = document.getElementById("score");
  const finalScoreElement = document.getElementById("finalScore");

  let gameInterval;
  let scoreInterval;
  let isGameOver = false;
  let score = 0;

  function startGame() {
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    cactus.style.animation = 'none';
    void cactus.offsetWidth; // Trigger reflow
    cactus.style.animation = 'moveCactus 2s infinite linear';
    
    isGameOver = false;
    gameOverPopup.classList.add("hidden");
    gameOverPopup.classList.remove("flex");

    if (gameInterval) clearInterval(gameInterval);
    if (scoreInterval) clearInterval(scoreInterval);

    scoreInterval = setInterval(() => {
      score++;
      scoreElement.textContent = `Score: ${score}`;
    }, 100);

    gameInterval = setInterval(() => {
      if (isGameOver) return;

      const dinoRect = dino.getBoundingClientRect();
      const cactusRect = cactus.getBoundingClientRect();

      if (
          dinoRect.right > cactusRect.left &&
          dinoRect.left < cactusRect.right &&
          dinoRect.bottom > cactusRect.top &&
          dinoRect.top < cactusRect.bottom
      ) {
        isGameOver = true;
        clearInterval(gameInterval);
        clearInterval(scoreInterval);
        finalScoreElement.textContent = score;
        gameOverPopup.classList.remove("hidden");
        gameOverPopup.classList.add("flex");
        cactus.style.animationPlayState = 'paused';
      }
    }, 10);
  }

  function jump() {
    if (!dino.classList.contains("jump") && !isGameOver) {
      dino.classList.add("jump");
      setTimeout(() => {
        dino.classList.remove("jump");
      }, 600);
    }
  }

  document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
      event.preventDefault(); // Prevent scrolling on spacebar
      if(isGameOver) {
        startGame();
      } else {
        jump();
      }
    }
  });

  playAgainBtn.addEventListener("click", () => {
      cactus.style.animationPlayState = 'running';
      startGame();
  });

  // Start game automatically on load
  startGame();
