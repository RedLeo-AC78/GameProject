document.addEventListener("DOMContentLoaded", function() {
  const gameText = document.getElementById("game-text");
  const phrases = [
    "Galactus se rend sur Terre,",
    "il mange les planètes sur son chemin.",
    "Plus il mange de planètes,",
    "plus le score augmente.",
    "Chaque palier fait apparaître une question.",
    "Trois planètes apparaîtront avec une proposition.",
    "Mangé la planète de votre choix",
    "pour répondre au questionnaire.",
    "Parviendrez-vous à atteindre la Terre ?",
  ];

  let indexPhrase = 0;

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
 
const skipButton = document.getElementById("skip-button");


skipButton.addEventListener("click", () => {
 console.log("cliked")
  window.location.href = "game.php";
});

  function showText() {
    if (indexPhrase < phrases.length) {
      let span = document.createElement("span");
      span.style.display = "block";
      gameText.appendChild(span);

      typeText(phrases[indexPhrase], span, 50, () => {
        indexPhrase++;
        showText();
      });
    } else {
      setTimeout(() => {
        window.location.href = "game.php";
      }, 1500);
    }
  }

  setTimeout(() => {
    gameText.style.opacity = "1";
    gameText.style.visibility = "visible";
    showText();
  }, 6000);
});
