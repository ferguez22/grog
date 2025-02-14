document.getElementById('startQuiz').addEventListener('click', function () {
    document.getElementById('startScreen').style.display = 'none'; // Ocultar la primera pantalla
    document.getElementById('instagramScreen').style.display = 'block'; // Mostrar la segunda pantalla
    const form1 = document.getElementById('clientForm1');
    form1.style.display = 'block';
    form1.classList.add('fade-in');
});

// Función para habilitar o deshabilitar el botón "Siguiente"
function toggleNextButton() {
    const username = document.getElementById('username').value;
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
}

// Agregar evento de entrada al campo de nombre de usuario
document.getElementById('username').addEventListener('input', toggleNextButton);

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

const nextButtons = document.querySelectorAll('.nextBtn');
let currentFormIndex = 0;

nextButtons.forEach((button, index) => {
    button.addEventListener('click', function () {
        const currentForm = document.getElementById(`clientForm${index + 1}`);
        currentForm.style.display = 'none'; // Ocultar el formulario actual
        currentFormIndex++;

        if (currentFormIndex < nextButtons.length) {
            const nextForm = document.getElementById(`clientForm${currentFormIndex + 1}`);
            nextForm.style.display = 'block'; // Mostrar el siguiente formulario
            nextForm.classList.add('fade-in');
        } else {
            // Mostrar el mensaje de agradecimiento después de completar la última pantalla
            document.getElementById('thankYouMessage').style.display = 'block';
            document.getElementById('instagramLink').style.display = 'block'; // Mostrar el enlace de Instagram
        }
    });
});

document.getElementById('instagramLink').addEventListener('click', function () {
    // Ocultar el mensaje de agradecimiento y el enlace de Instagram
    document.getElementById('thankYouMessage').style.display = 'none';
    document.getElementById('instagramLink').style.display = 'none';
    
    // Ocultar todas las pantallas y formularios
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('instagramScreen').style.display = 'none';
    document.getElementById('clientForm1').style.display = 'none';
    document.getElementById('clientForm2').style.display = 'none';
    document.getElementById('clientForm3').style.display = 'none';

    // Mostrar el mensaje de "Verificando..."
    document.getElementById('verifying').style.display = 'block';

    localStorage.setItem('followedGrog', 'true');
    
    // Cambiar el tiempo de espera a 8000 ms (8 segundos)
    setTimeout(function () {
        // Ocultar el mensaje de "Verificando..."
        document.getElementById('verifying').style.display = 'none';
        // Mostrar el cupón
        document.getElementById('coupon').style.display = 'block';
    }, 8000); // Cambiado a 8000 ms
});

window.addEventListener('load', function () {
    if (localStorage.getItem('claimedCoupon') === 'true') {
        document.getElementById('coupon').style.display = 'block';
    } else if (localStorage.getItem('followedGrog') === 'true') {
        document.getElementById('verifying').style.display = 'block';
        setTimeout(function () {
            document.getElementById('verifying').style.display = 'none';
            document.getElementById('coupon').style.display = 'block';
            localStorage.setItem('followedGrog', 'false');
            localStorage.setItem('claimedCoupon', 'true');
        }, 100);
    } else {
        // Si no hay datos en localStorage, mostrar la primera pantalla
        document.getElementById('startScreen').style.display = 'block';
    }
});