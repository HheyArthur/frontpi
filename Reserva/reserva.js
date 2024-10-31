const recursosContainer = document.getElementById('recursosContainer');
const addRecursoButton = document.getElementById('addRecursoButton');

function createRecursoCard(nome, imageUrl) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <h3>${nome}</h3>
        <img src="${imageUrl}" alt="${nome}">
    `;
    recursosContainer.appendChild(card);
}

addRecursoButton.addEventListener('click', () => {
    // Lógica para adicionar um novo recurso (exemplo)
    const nome = prompt("Nome do recurso:");
    const imageUrl = prompt("URL da imagem:");
    if (nome && imageUrl) {
        createRecursoCard(nome, imageUrl);
        
    }
});


// Recursos iniciais (exemplo)
createRecursoCard("Piscina", "https://www.piscinasplanalto.com.br/wp-content/uploads/2024/05/Qual-e-a-melhor-piscina-Piscina-de-vinil-ou-de-azulejo-.jpeg");
createRecursoCard("Churrasqueira", "https://www.lojalaurindos.com.br/wp-content/uploads/2023/03/15181942320_Churrasqueira20Portatil20FOTO205.jpg");
createRecursoCard("Quadra", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWYMPayKGJBakSRBGMQwJubk4NJ7bZsRN9FA&s");