// Inicializar Animaciones
AOS.init({
    duration: 1000,
    once: true
});

// Cuenta regresiva
const updateCountdown = () => {
    const weddingDate = new Date(2026, 6, 25, 12, 30, 0).getTime();
    const now = new Date().getTime();
    const gap = weddingDate - now;

    const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;

    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    document.getElementById("days").innerText = d < 10 ? '0' + d : d;
    document.getElementById("hours").innerText = h < 10 ? '0' + h : h;
    document.getElementById("minutes").innerText = m < 10 ? '0' + m : m;
    document.getElementById("seconds").innerText = s < 10 ? '0' + s : s;

    if (gap < 0) {
        document.getElementById("countdown").innerHTML = "<h3>¡Hoy es el gran día!</h3>";
    }
};
setInterval(updateCountdown, 1000);
updateCountdown();

// Control de Audio
const playBtn = document.getElementById('play-btn');
const music = document.getElementById('bg-music');
if(playBtn) {
    playBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            playBtn.innerText = "Pausar Música";
        } else {
            music.pause();
            playBtn.innerText = "Escuchar Música";
        }
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("¡CLABE copiada al portapapeles! Gracias.");
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

// LÓGICA RSVP CORREGIDA
// ... (Toda la parte del contador y música se queda igual) ...

const form = document.getElementById("rsvp-form");
const successMessage = document.getElementById("success-message");
const thanksText = document.getElementById("thanks-text");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // PEGA AQUÍ LA URL QUE COPIASTE EN EL PASO ANTERIOR
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzYArb8Q97k-SJFw3lSxq4BLn22VzNgb2XX0KEBAzsHf705BZ7Kd4VL08zsgqKFNduZ4w/exec';

    const formData = new FormData(form);
    const guestName = document.getElementById('name').value;

    // Enviamos los datos
    fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' })
    .then(() => {
        // Animación de salida
        form.style.transition = "all 0.5s ease";
        form.style.opacity = "0";
        form.style.transform = "translateY(-20px)";

        setTimeout(() => {
            form.style.display = "none";
            if (thanksText) thanksText.innerText = `¡Gracias ${guestName}! Confirmación recibida 💛`;
            successMessage.style.display = "block";
            setTimeout(() => successMessage.classList.add("show"), 10);
        }, 500);
    })
    .catch(error => alert("Error al enviar. Intenta de nuevo."));
});

// Función para personalizar el nombre desde la URL
function personalizarInvitacion() {
    // 1. Obtenemos los parámetros de la URL (lo que va después del ?)
    const urlParams = new URLSearchParams(window.location.search);
    
    // 2. Buscamos el parámetro "n"
    const nombreInvitado = urlParams.get('n');

    // 3. Si existe el nombre en la URL, lo ponemos en el HTML
    if (nombreInvitado) {
        // Reemplazamos el texto "invitado" por el nombre real
        // .replace(/_/g, ' ') permite usar guiones bajos para espacios (ej: Juan_Perez)
        document.getElementById('guest-name').innerText = nombreInvitado.replace(/_/g, ' ');
    }
}

// Ejecutamos la función en cuanto cargue la página
window.addEventListener('load', personalizarInvitacion);