document.getElementById('agendarReservaForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const cpfMorador = document.getElementById('cpfMorador').value.trim().replace(/\D/g, '');
    const dataReserva = new Date(document.getElementById('dataReserva').value.trim()).toLocaleDateString('pt-BR');
    const areaReserva = document.getElementById('areaReserva').value.trim();

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

    const novaReserva = {
        cpf_morador: cpfMorador,
        data_reserva: dataReserva,
        area_reserva: areaReserva,
    };

    console.log('Dados da reserva:', novaReserva); // Log dos dados da reserva

    try {
        const response = await fetch('http://127.0.0.1:8000/reservar/agendar/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novaReserva),
        });

        const responseData = await response.json();
        console.log('Resposta do servidor:', responseData); // Log da resposta do servidor

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status} - ${responseData.message}`);
        }

        alert('Reserva realizada com sucesso!');
        window.location.href = 'reserva.html'; // Redireciona para a tela de áreas comuns
    } catch (error) {
        console.error('Erro ao agendar reserva:', error);
        alert(`Erro ao agendar reserva: ${error.message}. Verifique o console para mais detalhes.`);
    }
});

document.getElementById('cpf').addEventListener('input', function(event) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    event.target.value = value;
});