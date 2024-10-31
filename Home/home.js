const form = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    if (login === "admin" && senha === "321") {
        window.location.href = "../Home/home.html";

    } else {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Usuário ou senha incorretos.";
    }
}); 