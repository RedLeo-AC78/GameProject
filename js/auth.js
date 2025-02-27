// Function to toggle between login and signup forms
function toggleForm() {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const toggleText = document.getElementById("toggle-text");
    const formTitle = document.getElementById("form-title");

    if (loginForm.style.display === "none") {
        // Show login form
        loginForm.style.display = "block";
        signupForm.style.display = "none";
        formTitle.innerText = "Login"; // Update title
        toggleText.innerHTML = "Don't have an account? <a href='javascript:void(0)' onclick='toggleForm()'>Signup</a>";
    } else {
        // Show signup form
        loginForm.style.display = "none";
        signupForm.style.display = "block";
        formTitle.innerText = "Signup"; // Update title
        toggleText.innerHTML = "Already have an account? <a href='javascript:void(0)' onclick='toggleForm()'>Login</a>";
    }
}
