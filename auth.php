<?php
session_start();

if (isset($_SESSION['username'])) {
    header("Location: index.php");
    exit();
}

$host = "localhost";
$dbname = "galactus";
$username = "root";
$password ="";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["action"])) {
    $identifiant = trim($_POST["identifiant"]);
    $motdepasse = trim($_POST["motdepasse"]);

    if (empty($identifiant) || empty($motdepasse)) {
        $error = "All fields are required.";
    } else {
        if ($_POST["action"] === "login") {
            $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
            $stmt->execute([$identifiant]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($motdepasse, $user["password"])) {
                $_SESSION["username"] = $user["username"];
                header("Location: index.php");
                exit();
            } else {
                $error = "Invalid username or password.";
            }
        } elseif ($_POST["action"] === "signup") {
            $email = trim($_POST["email"]);
            $genre = isset($_POST["genre"]) ? $_POST["genre"] : "";
            $age = isset($_POST["age"]) ? (int) $_POST["age"] : 0;

            if (empty($email) || empty($genre) || empty($age)) {
                $error = "All fields are required.";
            } elseif ($age < 1) {
                $error = "Invalid age.";
            } else {
                $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
                $stmt->execute([$identifiant, $email]);
                if ($stmt->fetch()) {
                    $error = "Username or email already exists.";
                } else {
                    $hashedPassword = password_hash($motdepasse, PASSWORD_DEFAULT);
                    $stmt = $pdo->prepare("INSERT INTO users (username, email, password, genre, age, top_score) VALUES (?, ?, ?, ?, ?, 0)");
                    if ($stmt->execute([$identifiant, $email, $hashedPassword, $genre, $age])) {
                        $_SESSION["username"] = $identifiant;
                        header("Location: index.php");
                        exit();
                    } else {
                        $error = "Signup failed. Try again.";
                    }
                }
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login / Signup</title>
    <link rel="stylesheet" href="css/auth.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
    <div class="container">
        <h1 id="form-title">Login</h1>

        <?php if (!empty($error)): ?>
            <p style="color: red;"><?= htmlspecialchars($error) ?></p>
        <?php endif; ?>

        <div id="login-form">
            <form method="POST">
                <input type="hidden" name="action" value="login">
                <div class="input-group">
                    <i class="fas fa-user"></i>
                    <input type="text" name="identifiant" placeholder="Username" required>
                </div>
                <div class="input-group">
                    <i class="fas fa-lock"></i>
                    <input type="password" name="motdepasse" placeholder="Password" required>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>

        <div id="signup-form" style="display: none;">
            <form method="POST">
                <input type="hidden" name="action" value="signup">
                <div class="input-group">
                    <i class="fas fa-user"></i>
                    <input type="text" name="identifiant" placeholder="Username" required>
                </div>
                <div class="input-group">
                    <i class="fas fa-envelope"></i>
                    <input type="email" name="email" placeholder="Email" required>
                </div>
                <div class="input-group">
                    <i class="fas fa-venus-mars"></i>
                    <label>
                        <input type="radio" name="genre" value="Homme" required> Homme
                    </label>
                    <label>
                        <input type="radio" name="genre" value="Femme" required> Femme
                    </label>
                </div>
                <div class="input-group">
                    <i class="fas fa-birthday-cake"></i>
                    <input type="number" name="age" placeholder="Âge" required min="1">
                </div>
                <div class="input-group">
                    <i class="fas fa-lock"></i>
                    <input type="password" name="motdepasse" placeholder="Password" required>
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>

        <p id="toggle-text">Don't have an account? <a href="javascript:void(0)" onclick="toggleForm()">Signup</a></p>
    </div>
    <script src="js/auth.js"></script>
</body>
</html>
