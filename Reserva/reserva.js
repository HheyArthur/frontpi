const recursosContainer = document.getElementById('recursosContainer');
const addRecursoButton = document.getElementById('addRecursoButton');
const apiUrl = 'http://127.0.0.1:8000'; // Substitua 'Apiaqui' pela URL da sua API

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

// Adiciona recurso = Area comum
addRecursoButton.addEventListener('click', async () => {
    const nome_area = prompt("Nome do recurso:");
    const horario_funcionamento = prompt("Horário de funcionamento:");
    const reservado_por = prompt("Reservado por (opcional):");
    // const imageUrl = prompt("URL da imagem (opcional):");

    if (nome_area && horario_funcionamento) {
        try {
            const novo_area_reserva = {
                disponivel: true,
                nome_area: nome_area,
                horario_funcionamento: horario_funcionamento,
                reservado_por: reservado_por || null,
            };


            const response = await fetch(`${apiUrl}/areas_reservaveis/cadastro/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novo_area_reserva),
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }

            const data = await response.json();
            createRecursoCard(data); // Cria o card com os dados recebidos da API

            // Refresh na página para mostrar o novo recurso
            location.reload();

        } catch (error) {
            console.error("Erro ao adicionar recurso:", error);
            alert("Erro ao adicionar recurso. Verifique o console para mais detalhes.");
        }
    } else {
        alert("Nome e horário são obrigatórios.");
    }
});

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
    `
    ;
    recursosContainer.appendChild(card);

    const reserveButton = card.querySelector('.reserve-button');
    const deleteButton = card.querySelector('.delete-button');
    const dataReservaDiv = card.querySelector('.data-reserva');

    reserveButton.addEventListener('click', () => {
        reservaModal.style.display = "block";
        currentRecurso = recurso;
        currentCard = card;
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

