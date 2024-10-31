const comunicadosContainer = document.getElementById('comunicadosContainer');
const addCardButton = document.getElementById('addCardButton');

function createCard() {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <h3>Novo comunicado</h3>
        <p>Comunicado referente conta...</p>
    `;
    comunicadosContainer.appendChild(card);
}

addCardButton.addEventListener('click', createCard);



// Cria alguns cards iniciais (opcional)
for (let i = 0; i < 3; i++) {
    createCard();
}