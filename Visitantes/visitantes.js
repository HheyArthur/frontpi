document.addEventListener("DOMContentLoaded", function() {
    // Função para listar os visitantes
    function listarVisitantes() {
        fetch('http://127.0.0.1:8000/visitantes/listar/')
            .then(response => response.json())
            .then(data => {
                const visitantesContainer = document.getElementById('visitantesContainer');
                visitantesContainer.innerHTML = ''; // Limpar conteúdo anterior

                if (data && data.length > 0) {
                    // Para cada visitante, criar um card e exibir
                    data.forEach(visitante => {
                        const dataEntrada = visitante.data_entrada || 'Data não disponível';
                        const dataSaida = visitante.data_saida || 'Data não disponível';
                        const nome = visitante.nome || 'Nome não disponível';
                        const cpf = visitante.cpf || 'CPF não disponível';
                        const telefone = visitante.telefone || 'Telefone não disponível';
                        const veiculo = visitante.veiculo || 'Veículo não disponível';

                        // Criando o card de visitante
                        const visitanteCard = document.createElement('li');
                        visitanteCard.classList.add('card');
                        
                        visitanteCard.innerHTML = `
                            <div class="card-header">${nome}</div>
                            <div class="card-content">
                                <p><span class="label">CPF:</span> ${cpf}</p>
                                <p><span class="label">Telefone:</span> ${telefone}</p>
                                <p><span class="label">Veículo:</span> ${veiculo}</p>
                                <p><span class="label">Data de Entrada:</span> ${dataEntrada}</p>
                                <p><span class="label">Data de Saída:</span> ${dataSaida}</p>
                            </div>
                        `;

                        visitantesContainer.appendChild(visitanteCard);
                    });
                } else {
                    visitantesContainer.innerHTML = '<p>Nenhum visitante cadastrado.</p>';
                }
            })
            .catch(error => console.error('Erro ao listar visitantes:', error));
    }

    // Chama a função ao carregar a página para listar os visitantes
    listarVisitantes();

    document.getElementById('addVisitanteButton').addEventListener('click', function() {
        window.location.href = 'criarVisitante.html';  
    });

});
