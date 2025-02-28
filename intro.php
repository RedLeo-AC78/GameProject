<?php
session_start();

if (!isset($_SESSION['username'])) {
    header("Location: auth.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Introduction du Jeu</title>
    <link rel="stylesheet" href="css/intro.css" />
  </head>
  <body>
  <audio id="backgroundMusic" loop>
      <source
        src="audio/02 - Prologue Super Metroid OST.mp3"
        type="audio/mpeg"
      />
    </audio>
    <div class="intro-container">
      <h1 id="game-title">Galactus : Journey to the Earth</h1>
      <img
        id="intro-image"
        src="img/Devoured_Token.png"
        alt="Intro Image"
      />
      <div id="text-overlay">
        <p id="game-text"></p>
      </div>
      </div>
      <!-- Bouton Skip -->
      <button id="skip-button">Skip</button>
    </div>
    </div>
    <script src="js/intro.js"></script>
  </body>
</html>
