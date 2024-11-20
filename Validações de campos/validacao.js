// Função para validar nome (não aceita números ou caracteres especiais)
function validateNome(nome) {
    const re = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    return re.test(nome);
}

// Função para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Função para validar telefone (apenas números)
function validateTelefone(telefone) {
    const re = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return re.test(telefone);
}

// Função para validar CPF (apenas números)
function validateCPF(cpf) {
    const re = /^\d{11}$/;
    return re.test(cpf);
}


// Máscara para o campo de telefone
document.getElementById('telefone')?.addEventListener('input', function(event) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    event.target.value = value;
});



// Máscara para o campo de CPF do Morador na tela de agendar reserva
document.getElementById('cpfMorador')?.addEventListener('input', function(event) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{2})$/, '$1-$2');
    event.target.value = value;
});

// Remover caracteres inválidos do campo de nome
document.getElementById('nome')?.addEventListener('input', function(event) {
    let value = event.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '');
    event.target.value = value;
});