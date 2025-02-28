// Declare DOM elements
const gameContainer = document.getElementById("gameContainer");
const player = document.getElementById("player");

// Game dimensions
const gameWidth = gameContainer.offsetWidth;
const gameHeight = gameContainer.offsetHeight;

// Player position and speed
let playerX = (gameWidth - 50) / 2;
let playerY = gameHeight - 60;
const initialSpeed = 5;
let playerSpeed = initialSpeed;

// Keyboard key management
let keys = {};

// Score and game state
let score = 0;
let obstacleExists = false;
let gameOver = false;

// Magnetic obstacles
let magneticObstacles = [];
const maxMagneticObstacles = 2;

// Score display
const scoreDisplay = document.createElement("div");
scoreDisplay.id = "score";
scoreDisplay.innerText = "Score: 0";
gameContainer.appendChild(scoreDisplay);

// Event listeners for keyboard inputs
document.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

// Function to move the player based on key presses
function movePlayer() {
  if (keys["ArrowLeft"]) {
    playerX = Math.max(0, playerX - playerSpeed);
  }
  if (keys["ArrowRight"]) {
    playerX = Math.min(gameWidth - 50, playerX + playerSpeed);
  }
  if (keys["ArrowUp"]) {
    playerY = Math.max(0, playerY - playerSpeed);
  }
  if (keys["ArrowDown"]) {
    playerY = Math.min(gameHeight - 50, playerY + playerSpeed);
  }
  player.style.left = playerX + "px";
  player.style.top = playerY + "px";
}

// Call movePlayer function every 20ms
setInterval(movePlayer, 20);

// Function to create an obstacle from the left
function createObstacleFromLeft() {
  if (gameOver || obstacleExists) return;
  obstacleExists = true;

  // Create obstacle element
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  obstacle.style.top = Math.random() * (gameHeight - 50) + "px";
  obstacle.style.left = "-50px";
  gameContainer.appendChild(obstacle);

  let obstacleSpeed = 20;
  let obstacleInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(obstacleInterval);
      obstacle.remove();
      return;
    }
    // Check for collision with player
    let obstacleLeft = parseInt(obstacle.style.left);
    let obstacleTop = parseInt(obstacle.style.top);
    let playerLeft = parseInt(player.style.left);
    let playerTop = parseInt(player.style.top);
    let playerWidth = 150;
    let playerHeight = 100;
    let obstacleWidth = 90;
    let obstacleHeight = 40;

    if (
      obstacleLeft < playerLeft + playerWidth &&
      obstacleLeft + obstacleWidth > playerLeft &&
      obstacleTop < playerTop + playerHeight &&
      obstacleTop + obstacleHeight > playerTop
    ) {
      playerSpeed = Math.max(1, playerSpeed - 1.5);

      console.log(
        "Collision avec obstacle gauche ! Nouvelle vitesse :",
        playerSpeed
      );
    }

    // Remove obstacle when it reaches the right edge
    if (obstacleLeft >= gameWidth) {
      clearInterval(obstacleInterval);
      obstacle.remove();
      obstacleExists = false;
      setTimeout(createObstacleFromLeft, 8000);
    } else {
      obstacle.style.left = obstacleLeft + obstacleSpeed + "px";
    }
  }, 50);
}

// Function to create an obstacle from the right
function createObstacleFromRight() {
  if (gameOver || obstacleExists) return;
  obstacleExists = true;
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle2");
  obstacle.style.top = Math.random() * (gameHeight - 50) + "px";
  obstacle.style.left = gameWidth + "px";
  gameContainer.appendChild(obstacle);

  let obstacleSpeed = 20;
  let obstacleInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(obstacleInterval);
      obstacle.remove();
      return;
    }

    // Check for collision with player
    let obstacleLeft = parseInt(obstacle.style.left);
    let obstacleTop = parseInt(obstacle.style.top);
    let playerLeft = parseInt(player.style.left);
    let playerTop = parseInt(player.style.top);
    let playerWidth = 150;
    let playerHeight = 100;
    let obstacleWidth = 90;
    let obstacleHeight = 40;

    if (
      obstacleLeft < playerLeft + playerWidth &&
      obstacleLeft + obstacleWidth > playerLeft &&
      obstacleTop < playerTop + playerHeight &&
      obstacleTop + obstacleHeight > playerTop
    ) {
      playerSpeed = Math.max(1, playerSpeed - 1.5);

      console.log(
        "Collision avec obstacle droit ! Nouvelle vitesse :",
        playerSpeed
      );
    }

    // Remove obstacle when it reaches the left edge
    if (obstacleLeft <= -50) {
      clearInterval(obstacleInterval);
      obstacle.remove();
      obstacleExists = false;
      setTimeout(createObstacleFromRight, 8000);
    } else {
      obstacle.style.left = obstacleLeft - obstacleSpeed + "px";
    }
  }, 50);
}

// Function to create falling objects (planets)
function createFallingObject() {
  if (gameOver) return;

  const object = document.createElement("div");
  object.classList.add("fallingObject");
  object.style.left = Math.random() * (gameWidth - 30) + "px";
  object.style.top = "0px";

  const images = ["img/Planet-1.gif", "img/Planet-3.png", "img/Planet-4.gif"];
  object.style.backgroundImage = `url(${
    images[Math.floor(Math.random() * images.length)]
  })`;
  object.style.backgroundSize = "cover";

  gameContainer.appendChild(object);

  let fallInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(fallInterval);
      object.remove();
      return;
    }

    let objectTop = parseInt(object.style.top);
    let objectLeft = parseInt(object.style.left);
    let playerLeft = parseInt(player.style.left);
    let playerTop = parseInt(player.style.top);

    // Check for collision with player
    if (
      objectTop + 30 >= playerTop &&
      objectTop <= playerTop + 50 &&
      objectLeft + 30 >= playerLeft &&
      objectLeft <= playerLeft + 50
    ) {
      clearInterval(fallInterval);
      object.remove();
      score++;
      scoreDisplay.innerText = "Score: " + score;
      playerSpeed = Math.min(initialSpeed, playerSpeed + 0.5);

      // Temporarily change player's image
      player.style.backgroundImage = 'url("img/2.png")';

      setTimeout(() => {
        player.style.backgroundImage = 'url("img/1.png")';
      }, 200);
    } else if (objectTop > gameHeight - 30) {
      clearInterval(fallInterval);
      object.remove();
      playerSpeed = Math.max(0, playerSpeed - 0.5);
      if (playerSpeed === 0) {
        showGameOver();
      }
    } else {
      object.style.top = objectTop + 5 + "px";
    }
  }, 50);
}

// Function to display the game over screen
function showGameOver() {
  if (gameOver) return;

  gameOver = true;
  sendScoreToServer();
  const gameOverScreen = document.createElement("div");
  gameOverScreen.id = "gameOverScreen";
  gameOverScreen.innerHTML = `
    <h2>Game Over</h2>
    <p>Your final score is: ${score}</p>
    <button id="retryButton">Retry</button>
  `;
  gameContainer.appendChild(gameOverScreen);

  const retryButton = document.getElementById("retryButton");
  retryButton.addEventListener("click", () => {
    location.reload(); // Recharger la page pour recommencer le jeu
  });
}

// Start game events
setTimeout(createObstacleFromLeft, 1000);
setTimeout(createObstacleFromRight, 5000);
setInterval(createFallingObject, 1000);

// Play background music after user interaction
window.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("backgroundMusic");
  music.volume = 0.5;

  document.body.addEventListener("click", () => {
    music.play().catch((error) => {
      console.log(
        "La lecture automatique est bloquée par le navigateur :",
        error
      );
    });
  });
});

// Function to create magnetic obstacles
function createMagneticObstacle() {
  if (magneticObstacles.length >= maxMagneticObstacles || gameOver) return;

  const magneticObstacle = document.createElement("div");
  magneticObstacle.classList.add("magneticObstacle");
  magneticObstacle.style.top = Math.random() * (gameHeight - 80) + "px";
  magneticObstacle.style.left = Math.random() * (gameWidth - 80) + "px";
  gameContainer.appendChild(magneticObstacle);
  magneticObstacles.push(magneticObstacle);

  let magnetInterval = setInterval(() => {
    let magnetLeft = parseInt(magneticObstacle.style.left);
    let magnetTop = parseInt(magneticObstacle.style.top);
    let playerLeft = parseInt(player.style.left);
    let playerTop = parseInt(player.style.top);

    // Calculate the distance between the player and the magnetic obstacle
    let distanceX = magnetLeft - playerLeft;
    let distanceY = magnetTop - playerTop;
    let distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    // If the player is within range, they are pulled towards the obstacle
    if (distance < 150 && distance > 10) {
      let pullStrength = 3.5;
      playerX += (distanceX / distance) * pullStrength;
      playerY += (distanceY / distance) * pullStrength;
      player.style.left = playerX + "px";
      player.style.top = playerY + "px";
    }
  }, 50);

  // If the player is within range, they are pulled towards the obstacle
  setTimeout(() => {
    clearInterval(magnetInterval);
    magneticObstacle.remove();
    magneticObstacles = magneticObstacles.filter(
      (obstacle) => obstacle !== magneticObstacle
    );
  }, 10000);
}

// Generate a new magnetic obstacle every 3 seconds
setInterval(createMagneticObstacle, 3000);

// Function to send the final score to the server
function sendScoreToServer() {
  if (gameOver) {
    console.log("Score final à envoyer:", score);

    fetch("game.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "score=" + encodeURIComponent(score),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse du serveur:", data);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi du score:", error);
      });
  }
}
