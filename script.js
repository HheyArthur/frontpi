// Variáveis globais
let recursoSelecionado;
let calendar;

// Configuração do calendário após o DOM estar totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
    const calendarioEl = document.getElementById('calendario');
    
    // Inicializa o calendário usando FullCalendar
    calendar = new FullCalendar.Calendar(calendarioEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [],  // Aqui você pode adicionar eventos iniciais, se houver
        dateClick: function(info) {
            alert(`Você selecionou o dia ${info.dateStr}`);
        },
        eventClick: function(info) {
            alert(`Evento: ${info.event.title}`);
        }
    });

    // Renderiza o calendário na tela
    calendar.render();
});

// Função para selecionar um recurso e mudar para a página de agendamento
function selectRecurso(recurso) {
    recursoSelecionado = recurso;
    document.getElementById('recursoNome').textContent = `Agendando: ${recurso}`;
    changePage('agendamentoPage');
}

// Função para adicionar uma reserva ao calendário
function adicionarReserva() {
    if (!calendar) {
        alert("Calendário ainda não carregado. Tente novamente.");
        return;
    }

    // Nome do evento com o recurso selecionado
    const eventName = `Reserva para ${recursoSelecionado}`;
    const selectedDate = calendar.getDate();
    const eventDate = selectedDate.toISOString().split('T')[0];

    // Adiciona o evento ao calendário
    calendar.addEvent({
        title: eventName,
        start: eventDate,
        allDay: true
    });

    alert(`Reserva para o recurso ${recursoSelecionado} foi adicionada no dia ${eventDate}!`);

    // Retorna para a página inicial
    goToHome();
}

// Função para alternar entre as páginas
function changePage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none'; // Oculta todas as páginas
    });
    document.getElementById(pageId).style.display = 'block'; // Mostra a página desejada
}

// Função para ir à página inicial
function goToHome() {
    changePage('homePage');
}

// Função de login simulada
function login() {
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    if (login === 'admin' && senha === 'admin') {
        changePage('homePage');
    } else {
        alert('Login ou senha incorretos!');
    }
}

// Inicializa na página de login
changePage('loginPage');
