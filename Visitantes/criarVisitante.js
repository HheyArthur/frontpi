document.addEventListener("DOMContentLoaded", () => {
    const apiUrlCadastro = "http://127.0.0.1:8000/visitantes/cadastro/";
    const cadastroForm = document.getElementById("cadastroForm");

    // Função para formatar a data no formato yyyy-MM-dd
    const formatDateToString = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };


    // Função para permitir apenas números no CPF
    const cpfInput = document.getElementById('cpf');
    cpfInput.addEventListener('input', function (event) {
        // Remove qualquer caractere não numérico
        cpfInput.value = cpfInput.value.replace(/\D/g, '');
    });

    // Função para permitir apenas letras no nome
    const nomeInput = document.getElementById('nome');
    nomeInput.addEventListener('input', function (event) {
        // Remove qualquer número ou caractere especial
        nomeInput.value = nomeInput.value.replace(/[^a-zA-Z\s]/g, '');
    });



    // Cadastrar visitante
    cadastroForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(cadastroForm);

        // Obter dados do formulário
        const nome = formData.get("nome").trim();
        const cpf = formData.get("cpf").trim();
        const telefone = formData.get("telefone").trim();
        const dataEntrada = formData.get("dataEntrada").trim();
        const dataSaida = formData.get("dataSaida") ? formData.get("dataSaida").trim() : "";

        // Validações de campos obrigatórios
        if (!nome) {
            alert("Nome é obrigatório.");
            return;
        }
        if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
            alert("CPF inválido. Deve ter 11 dígitos.");
            return;
        }
        if (telefone.length !== 11 || !/^\d+$/.test(telefone)) {
            alert("Telefone inválido. Deve ter 11 dígitos.");
            return;
        }
        if (!dataEntrada) {
            alert("Data de entrada é obrigatória.");
            return;
        }

        // Formatar data de entrada e data de saída para string no formato yyyy-MM-dd
        const formattedDataEntrada = formatDateToString(dataEntrada);
        const formattedDataSaida = dataSaida ? formatDateToString(dataSaida) : "";

        // Montar o objeto com os dados para enviar
        const visitanteData = {
            nome: String(nome),
            cpf: String(cpf),
            veiculo: String(formData.get("placa").trim() || ""), // Placa é opcional
            data_entrada: formattedDataEntrada,
            data_saida: formattedDataSaida,
            telefone: String(telefone)
        };

        try {
            const response = await fetch(apiUrlCadastro, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(visitanteData)
            });

            if (response.ok) {
                alert("Visitante cadastrado com sucesso!");
                window.location.href = "visitantes.html"; // Voltar para a lista
            } else {
                const errorDetails = await response.json();
                console.error("Erro no backend:", errorDetails);
                alert(`Erro no cadastro: ${errorDetails.detail.map(err => err.msg).join("\n")}`);
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao conectar com o servidor.");
        }
    });
});
