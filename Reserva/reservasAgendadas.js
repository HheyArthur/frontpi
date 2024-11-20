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

            const dataReserva = new Date(reserva.data_reserva).toLocaleDateString('pt-BR');

            card.innerHTML = `
                <h3>${reserva.area_reserva}</h3>
                <p>ID da reserva: ${reserva._Reserva__id_reserva}</p>
                <p>Data da Reserva: ${dataReserva}</p>
                <p>ID do morador: ${reserva._Reserva__id_morador}</p>
            `;

            reservasContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao listar reservas:', error);
        alert('Erro ao listar reservas. Verifique o console para mais detalhes.');
    }
});