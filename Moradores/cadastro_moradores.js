document.getElementById('cadastroForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    let cpf = document.getElementById('cpf').value.trim();
    const dataNascimento = document.getElementById('dataNascimento').value.trim();
    const numeroApartamento = document.getElementById('numeroApartamento').value.trim();
    const senha = document.getElementById('senha').value.trim();


    // Remove a máscara do CPF
    cpf = removeMascaraCPF(cpf);

    // Validações
    if (!nome || !validateNome(nome)) {
        alert('Nome inválido. Não deve conter números ou caracteres especiais.');
        return;
    }

    if (!email || !validateEmail(email)) {
        alert('Email inválido.');
        return;
    }

    if (!telefone || !validateTelefone(telefone)) {
        alert('Telefone inválido.');
        return;
    }

    if (!cpf || !validateCPF(cpf)) {
        alert('CPF inválido. Deve conter 11 dígitos.');
        return;
    }

    if (!dataNascimento) {
        alert('Data de nascimento é obrigatória.');
        return;
    }

    if (!numeroApartamento) {
        alert('O Numero é obrigatório.');
        return;
    }

    if (!senha) {
        alert('Senha é obrigatória.');
        return;
    }

    const novoMorador = {
        nome: nome,
        email: email,
        telefone: telefone,
        cpf: cpf,
        data_nascimento: dataNascimento,
        numero_apartamento: numeroApartamento,
        senha: senha
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/moradores/cadastro/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoMorador),
        }); 

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        alert('Cadastro realizado com sucesso!');
        window.location.href = 'moradores.html'; // Redireciona para a tela de moradores
    } catch (error) {
        console.error('Erro ao cadastrar morador:', error);
        alert('Erro ao cadastrar morador. Verifique o console para mais detalhes.');
    }
});