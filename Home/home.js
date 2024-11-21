document.addEventListener('DOMContentLoaded', async function() {
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
        const comunicadosContainer = document.querySelector('.comunicados');
        comunicadosContainer.innerHTML = ''; // Limpa a lista antes de adicionar os novos itens

        // Pega os dois recados mais recentes
        const recadosRecentes = recados.slice(-2);

        recadosRecentes.forEach(recado => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <h3>Recado</h3>
                <p class="break-line">${recado.conteudo}</p> 
                <p>Autor: ${recado.nome_autor}</p>
            `;

            comunicadosContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao listar recados:', error);
        alert('Erro ao listar recados. Verifique o console para mais detalhes.');
    }
});