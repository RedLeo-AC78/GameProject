<?php
  session_start();
  if(!isset($_SESSION['username'])){
    header('Location: auth.php');
    exit();
  }
  
  // Connect to the database
  $conn = new mysqli("localhost", "root","","galactus");

  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  // Fetch the top score from the database
  $username = $_SESSION['username'];
  $stmt = $conn->prepare("SELECT top_score FROM users WHERE username = ?");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $stmt->store_result();
  $stmt->bind_result($top_score);
  $stmt->fetch();
  $stmt->close();
  $conn->close();
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Galactus - Journey to the Earth</title>
    <link rel="stylesheet" href="css/index.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    />
  </head>
  <body>
    <audio id="backgroundMusic" loop>
      <source
        src="audio/Title - StarFox 2 - SNES - OST .mp3"
        type="audio/mpeg"
      />
    </audio>
  <?php if ($top_score > 0): ?>
        <div class="high-score">
            <h3>High Score: <span id="highScore"><?php echo htmlspecialchars($top_score); ?></span></h3>
        </div>
    <?php endif; ?>

    <div class="container">
      <h1 id="gameTitle">Galactus<br />Journey to the Earth</h1>
    </div>
    <div class="top-buttons">
      <!-- Settings icon without text -->
      <button onclick="toggleOptions()">
        <i class="fa fa-cogs"></i>
      </button>
      <!-- Tutorial icon without text -->
      <button onclick="showTutorial()">
        <i class="fa fa-question-circle"></i>
      </button>
      <button onclick="window.location.href = 'logout.php';">
        <i class="fa fa-sign-out-alt"></i>
      </button>
    </div>
    <div class="buttons">
      <!-- PLAY button with icon and text -->
      <button class="icon-button" id="playButton" onclick="window.location.href = 'intro.php';">
        <i class="fa fa-play"></i> <span id="playText">PLAY</span>
      </button>
      <!-- CREDITS button with icon and text -->
      <button class="icon-button" id="creditsButton">
        <i class="fa fa-info-circle"></i> <span id="creditsText">CREDITS</span>
      </button>
    </div>

    <!-- Options Menu -->
    <div id="optionsMenu" class="options-menu">
      <ul>
        <li>
          <span id="soundText">Sound</span>
          <!-- Sound toggle checkbox -->
          <label class="sound-toggle">
            <input type="checkbox" id="soundToggle" checked />
            <span class="slider"></span>
          </label>
        </li>
        <li>
          <span id="languageText">Languages</span>
          <!-- Language selector in settings -->
          <select id="languageSelectorOptions" onchange="changeLanguage()">
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </li>
        <li>
          <button onclick="closeOptions()">
            <i class="fa fa-arrow-left"></i>
            <!-- Back arrow icon -->
          </button>
        </li>
      </ul>
    </div>

    <!-- Tutorial -->
    <div id="tutorialMenu" class="tutorial-menu">
      <!-- Tutorial in English -->
      <div id="tutorial-en" class="tutorial-section">
        <h3 class="tutorial-title english">Rules of the game</h3>
        <!-- Colored title -->
        <p>
          Controls: Use the arrow keys on your keyboard to move Galactus through
          space.
        </p>
        <p>
          Objective: Galactus must eat as many planets as possible on his way to
          Earth. Each planet consumed increases your score.
        </p>
        <p>
          Survival Conditions: If he doesn't eat planets, he weakens, slows
          down, and eventually starves to death. Watch out for enemies along the
          way.
        </p>
        <p>
          Marvel Quiz: Every 5 planets eaten, a question about the Marvel
          universe appears. Three planets will be displayed, each representing a
          possible answer. To answer, Galactus must eat the planet of his
          choice.
        </p>
        <p>
          Progression: The more planets Galactus eats, the higher the score.
          Achieve the highest score to earn great rewards. Will you be able to
          guide Galactus to Earth?
        </p>
      </div>

      <!-- Tutorial in French -->
      <div id="tutorial-fr" class="tutorial-section" style="display: none">
        <h3 class="tutorial-title french">Règles du jeu</h3>
        <!-- Colored title -->
        <p>
          Commandes : Utilisez les flèches directionnelles du clavier pour
          déplacer Galactus à travers l’espace.
        </p>
        <p>
          Objectif : Galactus doit manger un maximum de planètes sur son chemin
          vers la Terre. Chaque planète avalée augmente votre score.
        </p>
        <p>
          Conditions de survie: S'il ne mange pas de planètes, il s'affaiblit,
          ralentit et finit par mourir de faim. Attention aux ennemis sur son
          passage.
        </p>
        <p>
          Quiz Marvel : Tous les 5 planètes mangées, une question sur l’univers
          Marvel apparaît. Trois planètes s’afficheront, chacune représentant
          une proposition de réponse. -Pour répondre, Galactus doit manger la
          planète de son choix.
        </p>
        <p>
          Progression : Plus Galactus mange de planètes, plus le score
          augmente. Obtenir le meilleur score pour gagner beaucoup de
          récompenses. Parviendrez-vous à guider Galactus jusqu’à la Terre ?
        </p>
      </div>
    </div>
   
    <script src="js/index.js"></script>
  </body>
</html>
