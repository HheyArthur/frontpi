const pages = document.querySelectorAll('.page');
let currentPage = 'loginPage';

function changePage(pageId) {
    document.getElementById(currentPage).classList.remove('active');
    document.getElementById(pageId).classList.add('active');
    currentPage = pageId;
}

function goToHome() {
    changePage('homePage');
}

function login() {
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    if (login === 'admin' && senha === 'admin') {
        changePage('homePage');
    } else {
        alert('Login ou senha incorretos!');
    }
}

const comunicadosContainer = document.getElementById('comunicados');
const comunicados = [
    'Novo comunicado 1',
    'Comunicado referente conta',
    'Novo comunicado 3',
    'Comunicado referente conta',
    'Novo comunicado 5',
    'Comunicado referente conta'
];

comunicados.forEach(comunicado => {
    const comunicadoElement = document.createElement('div');
    comunicadoElement.innerText = comunicado;
    comunicadosContainer.appendChild(comunicadoElement);
});

const gridCalendario = document.querySelector('.grid-calendario');
for (let i = 1; i <= 35; i++) {
    const dia = document.createElement('div');
    gridCalendario.appendChild(dia);
}
