document.getElementById('cadastrarMoradorButton').addEventListener('click', function() {
    window.location.href = 'cadastro_moradores.html';
});

document.getElementById('listarMoradoresButton').addEventListener('click', async function() {
    try {
        const response = await fetch('http://127.0.0.1:8000/moradores/listar/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const moradores = await response.json();
        const moradoresContainer = document.getElementById('moradoresContainer');
        moradoresContainer.innerHTML = ''; // Limpa a lista antes de adicionar os novos itens

        moradores.forEach(morador => {
            const card = document.createElement('div');
            card.classList.add('morador-card');

            card.innerHTML = `
                <h3>${morador.nome}</h3>
                <p>Email: ${morador.email}</p>
                <p>Telefone: ${morador.telefone}</p>
                <p>CPF: ${morador.cpf}</p>
                <p>Data de Nascimento: ${morador.data_nascimento}</p>
                <button class="delete-button" data-id="${morador.id}">Deletar</button>
            `;

            moradoresContainer.appendChild(card);
        });

        // Adiciona evento de clique para os botões de deletar
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', async function() {
                const moradorId = this.getAttribute('data-id');
                await deletarMorador(moradorId);
            });
        });
    } catch (error) {
        console.error('Erro ao listar moradores:', error);
        alert('Erro ao listar moradores. Verifique o console para mais detalhes.');
    }
});

// Função para deletar morador
async function deletarMorador(nome) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/moradores/deletar/${nome}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        alert('Morador deletado com sucesso!');
        // Recarrega a lista de moradores
        document.getElementById('listarMoradoresButton').click();
    } catch (error) {
        console.error('Erro ao deletar morador:', error);
        alert('Erro ao deletar morador. Verifique o console para mais detalhes.');
    }
}