document.getElementById('cadastroAreaForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nomeArea = document.getElementById('nomeArea').value.trim();
    const horarioFuncionamento = document.getElementById('horarioFuncionamento').value.trim();
    const reservadoPor = document.getElementById('reservadoPor').value.trim();

    if (!nomeArea || !horarioFuncionamento) {
        alert('Nome da área e horário de funcionamento são obrigatórios.');
        return;
    }

    const novaAreaComum = {
        nome_area: nomeArea,
        horario_funcionamento: horarioFuncionamento,
        disponivel: !reservadoPor, // Se tiver reservado_por, não está disponível
        reservado_por: reservadoPor || null,
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/areas_reservaveis/cadastro/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novaAreaComum),
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        alert('Cadastro realizado com sucesso!');
        window.location.href = 'reserva.html'; // Redireciona para a tela de áreas comuns
    } catch (error) {
        console.error('Erro ao cadastrar área comum:', error);
        alert('Erro ao cadastrar área comum. Verifique o console para mais detalhes.');
    }
});