const form = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    const loginData = {
        email: email,
        senha: senha
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/moradores/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            throw new Error('Usuário ou senha incorretos.');
        }

        window.location.href = "../Home/home.html"; 
    } catch (error) {
        errorMessage.style.display = "block";
        errorMessage.textContent = error.message;
    }
});