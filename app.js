let respuestas = {
    tinder1: '',
    tinder2: '',
    tinder3: ''
};

document.getElementById('startQuiz').addEventListener('click', function () {
    document.getElementById('startScreen').style.display = 'none'; // Ocultar la primera pantalla
    document.getElementById('instagramScreen').style.display = 'block'; // Mostrar la segunda pantalla
});

document.querySelector('#instagramScreen .nextBtn').addEventListener('click', function () {
    document.getElementById('instagramScreen').style.display = 'none'; // Ocultar la segunda pantalla
    const form1 = document.getElementById('clientForm1');
    form1.style.display = 'block'; // Mostrar la tercera pantalla
    form1.classList.add('fade-in'); // Asegúrate de que la clase de animación esté presente

    // Asegúrate de que el formulario 2 esté oculto
    const form2 = document.getElementById('clientForm2');
    form2.style.display = 'none'; // Ocultar la cuarta pantalla
});

document.querySelector('#clientForm1 .nextBtn').addEventListener('click', function () {
    const form1 = document.getElementById('clientForm1');
    form1.style.display = 'none'; // Ocultar la tercera pantalla
    const form2 = document.getElementById('clientForm2');
    form2.style.display = 'block'; // Mostrar la cuarta pantalla
    form2.classList.add('fade-in');

    const selectedRadio1 = document.querySelector('input[name="tinder1"]:checked');
    if (selectedRadio1) {
        respuestas.tinder1 = selectedRadio1.value; // Almacenar respuesta
    }
});

document.querySelector('#clientForm2 .nextBtn').addEventListener('click', function () {
    const form2 = document.getElementById('clientForm2');
    form2.style.display = 'none'; // Ocultar la cuarta pantalla
    const form3 = document.getElementById('clientForm3');
    form3.style.display = 'block'; // Mostrar la quinta pantalla
    form3.classList.add('fade-in');

    const selectedRadio2 = document.querySelector('input[name="tinder2"]:checked');
    if (selectedRadio2) {
        respuestas.tinder2 = selectedRadio2.value; // Almacenar respuesta
    }
});

document.querySelector('#clientForm3 .nextBtn').addEventListener('click', function () {
    const form3 = document.getElementById('clientForm3');
    form3.style.display = 'none'; // Ocultar la quinta pantalla

    const divthanks = document.getElementById('thankYouMessage');
    divthanks.style.display = 'block'; // Mostrar el mensaje de agradecimiento
    divthanks.classList.add('fade-in');

    const selectedRadio3 = document.querySelector('input[name="tinder3"]:checked');
    if (selectedRadio3) {
        respuestas.tinder3 = selectedRadio3.value; // Almacenar respuesta
    }

    // Almacenar respuestas en localStorage
    almacenarRespuestas();

    // Mostrar el enlace de Instagram
    document.getElementById('instagramLink').style.display = 'block'; // Mostrar el enlace de Instagram
});

// Agregar evento de clic al enlace de Instagram
document.getElementById('instagramLink').addEventListener('click', function () {
    // Ocultar el mensaje de agradecimiento
    document.getElementById('thankYouMessage').style.display = 'none'; // Ocultar el div de agradecimiento

    // Mostrar el mensaje de "Verificando..."
    document.getElementById('verifying').style.display = 'block'; // Mostrar el mensaje de verificando

    // Esperar 8000 ms antes de mostrar el cupón y las respuestas
    setTimeout(function () {
        document.getElementById('verifying').style.display = 'none'; // Ocultar el mensaje de verificando
        document.getElementById('coupon').style.display = 'block'; // Mostrar el cupón
        document.querySelector('header').style.display = 'none'; // Ocultar el logo
        mostrarRespuestas(); // Mostrar las respuestas

        // Almacenar que el usuario ha reclamado el cupón
        localStorage.setItem('claimedCoupon', 'true');
    }, 8000);
});

function toggleNextButton() {
    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const radios1 = document.querySelectorAll('input[name="tinder1"]');
    const radios2 = document.querySelectorAll('input[name="tinder2"]');
    const radios3 = document.querySelectorAll('input[name="tinder3"]');

    const nextButton1 = document.querySelector('#clientForm1 .nextBtn');
    const nextButton2 = document.querySelector('#clientForm2 .nextBtn');
    const nextButton3 = document.querySelector('#clientForm3 .nextBtn');

    // Verificar si el nombre de usuario está escrito y si al menos una opción de radio está seleccionada
    const isRadioChecked1 = Array.from(radios1).some(radio => radio.checked);
    const isRadioChecked2 = Array.from(radios2).some(radio => radio.checked);
    const isRadioChecked3 = Array.from(radios3).some(radio => radio.checked);

    nextButton1.disabled = !(username && isRadioChecked1);
    nextButton2.disabled = !isRadioChecked2;
    nextButton3.disabled = !isRadioChecked3;

    // Habilitar el botón solo si ambos campos están llenos
    const nextButton = document.querySelector('#instagramScreen .nextBtn');
    nextButton.disabled = !(username && name);
}

function mostrarRespuestas() {
    const userResponsesDiv = document.getElementById('userResponses');
    const username = document.getElementById('username').value; // Obtener el nombre de usuario de Instagram
    userResponsesDiv.innerHTML = `
    <p>@${username} dice:</p>
        <h3 class="badge">1. Si Grog fuera una cita de Tinder, ¿cómo sería?</h3>
        <p><strong>${respuestas.tinder1}</strong></p>
        <h3 class="badge">2. ¿Qué consejo le darías a tu "yo" de hace tres copas?</h3>
        <p><strong>${respuestas.tinder2}</strong></p>
        <h3 class="badge">3. Sin el coctel gratis, mi vida será…</h3>
        <p><strong>${respuestas.tinder3}</strong></p>
    `;
}

// Agregar evento de entrada a los campos de texto
document.getElementById('username').addEventListener('input', toggleNextButton);
document.getElementById('name').addEventListener('input', toggleNextButton);

// Agregar evento de cambio a las opciones de radio en el primer formulario
const radioButtons1 = document.querySelectorAll('input[name="tinder1"]');
radioButtons1.forEach(radio => {
    radio.addEventListener('change', toggleNextButton);
});

// Agregar evento de cambio a las opciones de radio en el segundo formulario
const radioButtons2 = document.querySelectorAll('input[name="tinder2"]');
radioButtons2.forEach(radio => {
    radio.addEventListener('change', toggleNextButton);
});

// Agregar evento de cambio a las opciones de radio en el tercer formulario
const radioButtons3 = document.querySelectorAll('input[name="tinder3"]');
radioButtons3.forEach(radio => {
    radio.addEventListener('change', toggleNextButton);
});

// Almacenar respuestas en localStorage
function almacenarRespuestas() {
    localStorage.setItem('respuestas', JSON.stringify(respuestas));
}

// Mostrar respuestas desde localStorage
function mostrarRespuestasDesdeLocalStorage() {
    const storedRespuestas = localStorage.getItem('respuestas');
    if (storedRespuestas) {
        respuestas = JSON.parse(storedRespuestas);
        mostrarRespuestas();
    }
}

// Llamar a la función al cargar la página
window.addEventListener('load', function () {
    // Verificar si el usuario ya ha reclamado el cupón
    if (localStorage.getItem('claimedCoupon') === 'true') {
        document.getElementById('coupon').style.display = 'block';
        document.getElementById('startScreen').style.display = 'none'; // Ocultar la primera pantalla
        document.querySelector('header').style.display = 'none'; // Ocultar el logo
    } else {
        // Si no hay datos en localStorage, mostrar la primera pantalla
        document.getElementById('startScreen').style.display = 'block';
    }

    // Mostrar respuestas desde localStorage
    mostrarRespuestasDesdeLocalStorage();
});