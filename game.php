<?php
session_start();

// Ensure the user is logged in
if (!isset($_SESSION['username'])) {
    header('Location: auth.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get score and username from session
    $score = $_POST['score'];
    $username = $_SESSION['username'];

    // Connect to the database
    $conn = new mysqli("localhost", "root" ,"", "galactus");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare the statement to get the top_score
    $stmt = $conn->prepare("SELECT top_score FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($top_score);
    $stmt->fetch();

    // Check if the new score is higher than the current top_score
    if ($score > $top_score) {
        // Prepare the statement to update the top_score
        $updateStmt = $conn->prepare("UPDATE users SET top_score = ? WHERE username = ?");
        $updateStmt->bind_param("is", $score, $username);
        
        // Execute and handle response
        if ($updateStmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Score saved and updated']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update score']);
        }
        $updateStmt->close();
    } else {
        echo json_encode(['status' => 'success', 'message' => 'Score is not higher than the current top score']);
    }

    // Close the statements and connection
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>

<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Galactus : Journey to the Earth</title>
    <link rel="stylesheet" href="css/game.css" />
  </head>
  <body>
    <audio id="backgroundMusic" loop>
      <source
        src="audio/Mega-Man-X-Corrupted-Opening-Sta.mp3"
        type="audio/mpeg"
      />
    </audio>
    <div id="leftBackground" class="background-image"></div>
    <div id="rightBackground" class="background-image"></div>

    <div id="gameContainer">
      <div class="player" id="player"></div>
    </div>
<a href="index.php" id="returnButton">Retour</a>
    <script src="js/game.js"></script>
  </body>
</html>