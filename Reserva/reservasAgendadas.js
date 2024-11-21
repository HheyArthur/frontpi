document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('http://127.0.0.1:8000/reservas/listar/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const reservas = await response.json();
        const reservasContainer = document.getElementById('reservasContainer');
        reservasContainer.innerHTML = ''; // Limpa a lista antes de adicionar os novos itens

        reservas.forEach(reserva => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <h3>${reserva._Reserva__area_reserva}</h3>
                <p>ID da reserva: ${reserva._Reserva__id_reserva}</p>
                <p>Data da Reserva: ${reserva._Reserva__data_reserva}</p>
                <button class="delete-button" data-id="${reserva._Reserva__id_reserva}">Cancelar Reserva</button>
            `;

            reservasContainer.appendChild(card);
        });

        // Adiciona evento de clique para os botões de deletar
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', async function() {
                const reservaId = this.getAttribute('data-id');
                await deletarReserva(reservaId);
            });
        });
    } catch (error) {
        console.error('Erro ao listar reservas:', error);
        alert('Erro ao listar reservas. Verifique o console para mais detalhes.');
    }
});

// Função para deletar reserva
async function deletarReserva(id_reserva) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/reserva/cancelar/${id_reserva}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        alert('Reserva cancelada com sucesso!');

        // Remove o card da reserva cancelada da lista
        const deleteButton = document.querySelector(`.delete-button[data-id="${id_reserva}"]`);
        if (deleteButton) {
            const reservaCard = deleteButton.closest('.card');
            if (reservaCard) {
                reservaCard.remove();
            } else {
                console.error('Erro ao encontrar o card da reserva para remover.');
            }
        } else {
            console.error('Erro ao encontrar o botão de deletar para o ID da reserva:', id_reserva);
        }
    } catch (error) {
        console.error('Erro ao cancelar reserva:', error);
        alert('Erro ao cancelar reserva. Verifique o console para mais detalhes.');
    }
}