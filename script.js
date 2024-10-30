const pages = document.querySelectorAll('.page');
let currentPage = 'loginPage'; // Página inicial

function changePage(pageId) {
    document.getElementById(currentPage).classList.remove('active');
    document.getElementById(pageId).classList.add('active');
    currentPage = pageId;

    if (pageId === 'agendamentoPage') {
        const recursoSelecionado = document.querySelector('.recurso.selected');
        if (recursoSelecionado) {
            document.getElementById('recursoNome').innerText = recursoSelecionado.dataset.recurso;
        }
    }
}

function login() {
    // Simulando login
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    if (login === 'admin' && senha === 'admin') {
        changePage('homePage');
    } else {
        alert('Login ou senha incorretos!');
    }
}

// Simulando comunicados
const comunicados = [
    'Novo comunicado 1',
    'Comunicado referente conta',
    'Novo comunicado 3',
    'Comunicado referente conta',
    'Novo comunicado 5',
    'Comunicado referente conta'
];

const comunicadosContainer = document.querySelectorAll('.comunicados');
comunicadosContainer.forEach(container => {
    comunicados.forEach(comunicado => {
        const comunicadoElement = document.createElement('div');
        comunicadoElement.innerText = comunicado;
        container.appendChild(comunicadoElement);
    });
});

// Simulando calendário
const gridCalendario = document.querySelector('.grid-calendario');
for (let i = 1; i <= 35; i++) {
    const dia = document.createElement('div');
    gridCalendario.appendChild(dia);
}

// Simulando reserva
const recursos = document.querySelectorAll('.recurso');
recursos.forEach(recurso => {
    recurso.addEventListener('click', () => {
        // Remove a classe 'selected' de qualquer outro recurso
        const recursoSelecionado = document.querySelector('.recurso.selected');
        if (recursoSelecionado) {
            recursoSelecionado.classList.remove('selected');
        }

        // Adiciona a classe 'selected' ao recurso clicado
        recurso.classList.add('selected');

        changePage('agendamentoPage');
    });
});

function adicionarReserva() {
    // Implemente a lógica para adicionar a reserva aqui
    alert('Reserva adicionada com sucesso!');
    changePage('homePage');
}

// Inicializa a página
changePage(currentPage);