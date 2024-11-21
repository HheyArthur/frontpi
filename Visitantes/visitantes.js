document.getElementById('addVisitanteButton').addEventListener('click', function() {
    window.location.href = 'criarVisitante.html';
});

document.getElementById('listarVisitantesButton').addEventListener('click', async function() {
    try {
        const response = await fetch('http://127.0.0.1:8000/visitantes/listar/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const visitantes = await response.json();
        const visitantesContainer = document.getElementById('visitantesContainer');
        visitantesContainer.innerHTML = ''; // Limpa a lista antes de adicionar os novos itens

        visitantes.forEach(visitante => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <h3>${visitante.nome}</h3>
                <p>CPF: ${visitante.cpf}</p>
                <p>Telefone: ${visitante.telefone}</p>
                <p>Veículo: ${visitante.veiculo}</p>
                <p>Data de Entrada: ${visitante.data_entrada}</p>
                <p>Data de Saída: ${visitante.data_saida}</p>
                
            `;

            visitantesContainer.appendChild(card);
        });

        // Adiciona evento de clique para os botões de deletar
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', async function() {
                const visitanteId = this.getAttribute('data-id');
                await deletarVisitante(visitanteId);
            });
        });
    } catch (error) {
        console.error('Erro ao listar visitantes:', error);
        alert('Erro ao listar visitantes. Verifique o console para mais detalhes.');
    }
});

