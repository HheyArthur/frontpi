document.getElementById('recadoForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const conteudo = document.getElementById('conteudo').value.trim();
    let cpfAutor = document.getElementById('cpfAutor').value.trim();

    // Remove a máscara do CPF
    cpfAutor = removeMascaraCPF(cpfAutor);

    // Validações
    if (!conteudo) {
        alert('Conteúdo é obrigatório.');
        return;
    }

    if (!cpfAutor || !validateCPF(cpfAutor)) {
        alert('CPF do autor inválido. Deve conter 11 dígitos.');
        return;
    }

    const novoRecado = {
        conteudo: conteudo,
        cpf_autor: cpfAutor
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/recados/cadastro/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoRecado),
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        alert('Recado cadastrado com sucesso!');
        window.location.href = 'mural.html'; // Redireciona para a tela do mural
    } catch (error) {
        console.error('Erro ao cadastrar recado:', error);
        alert('Erro ao cadastrar recado. Verifique o console para mais detalhes.');
    }
});

// Lógica do contador de caracteres
const conteudoTextarea = document.getElementById('conteudo');
const charCount = document.getElementById('charCount');

conteudoTextarea.addEventListener('input', function() {
    const currentLength = conteudoTextarea.value.length;
    charCount.textContent = `${currentLength}/300`;
});