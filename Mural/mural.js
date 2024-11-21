const comunicadosContainer = document.getElementById('comunicadosContainer');
const openRecadoPageButton = document.getElementById('openRecadoPageButton');

function createCard(conteudo, nome_autor) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <h3>Recado</h3>
        <p class="break-line">${conteudo}</p>
        <p>Autor: ${nome_autor}</p>
    `;
    comunicadosContainer.appendChild(card);
}

// Redireciona para a página de cadastro de recado
openRecadoPageButton.addEventListener('click', () => {
    window.location.href = 'cadastro_recado.html';
});

// Função para listar recados
async function listarRecados() {
    try {
        const response = await fetch('http://127.0.0.1:8000/recados/listar/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const recados = await response.json();
        comunicadosContainer.innerHTML = ''; // Limpa a lista antes de adicionar os novos itens

        recados.forEach(recado => {
            createCard(recado.conteudo, recado.nome_autor);
        });
    } catch (error) {
        console.error('Erro ao listar recados:', error);
        alert('Erro ao listar recados. Verifique o console para mais detalhes.');
    }
}

// Chama a função para listar recados ao carregar a página
document.addEventListener('DOMContentLoaded', listarRecados);