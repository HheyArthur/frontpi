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
                <p>Número do Apartamento: ${morador.numero_apartamento}</p>
                <button class="delete-button" data-cpf="${morador.cpf}">Deletar</button>
            `;

            moradoresContainer.appendChild(card);
        });

        // Adiciona evento de clique para os botões de deletar
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', async function() {
                const moradorCpf = this.getAttribute('data-cpf').replace(/\D/g, ''); // Remove caracteres especiais
                await deletarMorador(moradorCpf);
            });
        });
    } catch (error) {
        console.error('Erro ao listar moradores:', error);
        alert('Erro ao listar moradores. Verifique o console para mais detalhes.');
    }
});

// Função para deletar morador
async function deletarMorador(cpf) {
    try {
        const response = await fetch('http://127.0.0.1:8000/moradores/deletar/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([cpf]), // Envia o CPF como um array de strings
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        alert('Morador deletado com sucesso!');

        // Remove o card do morador deletado da lista
        const deleteButton = document.querySelector(`.delete-button[data-cpf="${cpf}"]`);
        if (deleteButton) {
            const moradorCard = deleteButton.closest('.morador-card');
            if (moradorCard) {
                moradorCard.remove();
            } else {
                console.error('Erro ao encontrar o card do morador para remover.');
            }
        } else {
            console.error('Erro ao encontrar o botão de deletar para o CPF:', cpf);
        }
    } catch (error) {
        console.error('Erro ao deletar morador:', error);
        alert('Erro ao deletar morador. Verifique o console para mais detalhes.');
    }
}