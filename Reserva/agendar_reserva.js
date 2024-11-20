document.getElementById('agendarReservaForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const cpfMorador = document.getElementById('cpfMorador').value.trim();
    const dataReserva = document.getElementById('dataReserva').value.trim();
    const areaReserva = document.getElementById('areaReserva').value.trim();
    const reservadoPor = document.getElementById('reservadoPor').value.trim();

    // Validações
    if (!cpfMorador || !validateCPF(cpfMorador)) {
        alert('CPF inválido.');
        return;
    }

    if (!dataReserva) {
        alert('Data da reserva é obrigatória.');
        return;
    }

    if (!areaReserva) {
        alert('Área reservada é obrigatória.');
        return;
    }

    if (!reservadoPor || !validateNome(reservadoPor)) {
        alert('Nome do responsável inválido. Não deve conter números ou caracteres especiais.');
        return;
    }

    const novaReserva = {
        cpf_morador: cpfMorador,
        data_reserva: dataReserva,
        area_reserva: areaReserva,
        reservado_por: reservadoPor
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/reservar/agendar/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novaReserva),
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        alert('Reserva realizada com sucesso!');
        window.location.href = 'reserva.html'; // Redireciona para a tela de áreas comuns
    } catch (error) {
        console.error('Erro ao agendar reserva:', error);
        alert('Erro ao agendar reserva. Verifique o console para mais detalhes.');
    }
});