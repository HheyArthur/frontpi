const recursosContainer = document.getElementById('recursosContainer');
const addRecursoButton = document.getElementById('addRecursoButton');
const apiUrl = 'http://127.0.0.1:8000'; // Substitua 'Apiaqui' pela URL da sua API

// Redireciona para a tela de cadastro de áreas comuns
addRecursoButton.addEventListener('click', () => {
    window.location.href = 'areas_comuns.html';
});

// Busca recursos
async function buscarRecursos() {
    try {
        const response = await fetch(`${apiUrl}/areas_reservaveis/listar/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar recursos:", error);
        return [];
    }
}

// Cria cartão de recurso
function createRecursoCard(recurso) {
    const card = document.createElement('div');
    card.classList.add('card');
    const imageUrl = recurso.imageUrl || "imagem_padrao.jpg";

    card.innerHTML = `
        <h3>${recurso.nome_area}</h3>
        <img src="${imageUrl}" alt="${recurso.nome_area}">
        <p>Horário: ${recurso.horario_funcionamento}</p>
        <p>Disponível: ${recurso.disponivel ? 'Sim' : 'Não'}</p>
        <p>${recurso.reservado_por ? `Reservado por: ${recurso.reservado_por}` : ''}</p>
        <button class="reserve-button">Reservar</button>
        <div class="data-reserva" style="display: none;"></div>
    `;
    recursosContainer.appendChild(card);

    const reserveButton = card.querySelector('.reserve-button');
    const dataReservaDiv = card.querySelector('.data-reserva');

    reserveButton.addEventListener('click', () => {
        window.location.href = `agendar_reserva.html?area=${encodeURIComponent(recurso.nome_area)}&reservadoPor=${encodeURIComponent(recurso.reservado_por || '')}`;
    });
}

// Carrega recursos
async function carregarRecursos() {
    const recursos = await buscarRecursos();
    recursos.forEach(createRecursoCard);
}

// Chama a função para carregar recursos ao iniciar
carregarRecursos();

let currentRecurso = null;
let currentCard = null;

const reservaModal = document.getElementById('reservaModal');
const closeButton = document.querySelector('.close-button');
const confirmarReservaButton = document.getElementById('confirmarReserva');
const reservaDataInput = document.getElementById('reservaData');

closeButton.addEventListener('click', () => {
    reservaModal.style.display = "none";
    currentRecurso = null;
    reservaDataInput.value = '';
});

confirmarReservaButton.addEventListener('click', () => {
    const dataSelecionada = reservaDataInput.value;
    if (dataSelecionada) {
        currentCard.querySelector('.data-reserva').textContent = `Reserva para: ${dataSelecionada}`;
        currentCard.querySelector('.data-reserva').style.display = "block";
        currentCard.querySelector('.reserve-button').style.display = "none"; 

        reservaModal.style.display = "none";
        reservaDataInput.value = ''; 
    } else {
        alert("Por favor, selecione uma data.");
    }
});

window.addEventListener('click', (event) => {
    if (event.target == reservaModal) {
        reservaModal.style.display = "none";
        currentRecurso = null;
        reservaDataInput.value = '';
    }
});