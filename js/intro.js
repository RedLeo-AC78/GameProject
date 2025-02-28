document.addEventListener("DOMContentLoaded", function () {
  // Get the game text element from the DOM
  const gameText = document.getElementById("game-text");
  const phrases = [
    "Galactus approche de la Terre !",
    "Dévore les planètes sur ton chemin !",
    "Plus tu engloutis d’astres, plus ton score grimpe !",
    "À chaque palier, un défi galactique t’attend !",
    "Trois planètes s'affichent,",
    "Chacune avec une réponse possible.",
    "Mange la planète de ton choix",
    "Survivras-tu jusqu'à la Terre ?",
    "Ou seras-tu perdu dans l'infini ?",
  ];

  let indexPhrase = 0; // Index to track the current phrase being displayed

  // Function to simulate a typewriter effect for the text
  function typeText(text, element, speed, callback) {
    let indexLetter = 0;
    function typeLetter() {
      if (indexLetter < text.length) {
        element.innerHTML += text.charAt(indexLetter);
        indexLetter++;
        setTimeout(typeLetter, speed);
      } else if (callback) {
        setTimeout(callback, 1500);
      }
    }
    typeLetter();
  }

  // Event listener to manage background music playback
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

  // Get the skip button from the DOM
  const skipButton = document.getElementById("skip-button");

  // Event listener for skipping the intro
  skipButton.addEventListener("click", () => {
    console.log("cliked");
    window.location.href = "game.php"; // Redirect to the game page
  });

  // Function to display the phrases sequentially
  function showText() {
    if (indexPhrase < phrases.length) {
      let span = document.createElement("span");
      span.style.display = "block";
      gameText.appendChild(span);

      // Type out the phrase and then move to the next one
      typeText(phrases[indexPhrase], span, 50, () => {
        indexPhrase++;
        showText();
      });
    } else {
      // After all phrases are displayed, redirect to the game page
      setTimeout(() => {
        window.location.href = "game.php";
      }, 1500);
    }
  }

  // Delay before starting the text display (fade-in effect)
  setTimeout(() => {
    gameText.style.opacity = "1";
    gameText.style.visibility = "visible";
    showText();
  }, 6000);
});
