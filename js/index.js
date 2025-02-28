// Functions for the game page
function toggleOptions() {
  console.log("Bouton tutoriel cliqué !");
  const menu = document.getElementById("optionsMenu");
  menu.style.display = menu.style.display === "none" ? "block" : "none";
}

function showTutorial() {
  console.log("Bouton tutoriel cliqué !");
  const tutorialMenu = document.getElementById("tutorialMenu");
  console.log("Élément trouvé :", tutorialMenu);
  if (tutorialMenu) {
    console.log("Affichage du tutoriel...");
    tutorialMenu.style.display =
      tutorialMenu.style.display === "none" ? "block" : "none";
  } else {
    console.log("Erreur : tutoriel non trouvé !");
  }
}

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

function closeOptions() {
  const optionsMenu = document.getElementById("optionsMenu");
  optionsMenu.style.display = "none";
}

function changeLanguage() {
  const languageSelectorOptions = document.getElementById(
    "languageSelectorOptions"
  );
  const selectedLanguage = languageSelectorOptions.value;

  const tutorialEn = document.getElementById("tutorial-en");
  const tutorialFr = document.getElementById("tutorial-fr");

  const playText = document.getElementById("playText");
  const creditsText = document.getElementById("creditsText");
  const soundText = document.getElementById("soundText");
  const languageText = document.getElementById("languageText");

  if (selectedLanguage === "fr") {
    tutorialEn.style.display = "none";
    tutorialFr.style.display = "block";
    playText.textContent = "JOUER";
    creditsText.textContent = "CRÉDITS";
    soundText.textContent = "Son";
    languageText.textContent = "Langues";
  } else {
    tutorialEn.style.display = "block";
    tutorialFr.style.display = "none";
    playText.textContent = "PLAY";
    creditsText.textContent = "CREDITS";
    soundText.textContent = "Sound";
    languageText.textContent = "Languages";
  }
}

// Sound toggle functionality
const soundToggle = document.getElementById("soundToggle");
soundToggle.addEventListener("change", function () {
  const soundStatus = this.checked ? "ON" : "OFF";
  if (confirm(`Sound will be turned ${soundStatus}. Continue?`)) {
    if (this.checked) {
      // Add code to enable sound
    } else {
      // Add code to disable sound
    }
  } else {
    this.checked = !this.checked; // Revert the toggle if user cancels
  }
});
function updateHighScore(score) {
  const highScoreElement = document.querySelector(".high-score");

  if (score > 0) {
    document.getElementById("highScore").textContent = score;
    highScoreElement.style.display = "block";
  } else {
    highScoreElement.style.display = "none";
  }
}
