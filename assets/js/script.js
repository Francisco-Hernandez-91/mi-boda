// Inicializar Animaciones
AOS.init({
    duration: 1000,
    once: true
});

// Cuenta regresiva
const updateCountdown = () => {
    // Seteamos la fecha de la boda (Año, Mes -1 (enero es 0), Día, Hora, Min, Seg)
    const weddingDate = new Date(2026, 6, 25, 17, 0, 0).getTime();
    const now = new Date().getTime();
    const gap = weddingDate - now;

    // Cálculos matemáticos
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Calculamos Días, Horas, Minutos y Segundos
    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    // Actualizamos el HTML con un formato de dos dígitos (00)
    document.getElementById("days").innerText = d < 10 ? '0' + d : d;
    document.getElementById("hours").innerText = h < 10 ? '0' + h : h;
    document.getElementById("minutes").innerText = m < 10 ? '0' + m : m;
    document.getElementById("seconds").innerText = s < 10 ? '0' + s : s;

    // Si la fecha ya pasó
    if (gap < 0) {
        document.getElementById("countdown").innerHTML = "<h3>¡Hoy es el gran día!</h3>";
    }
};

// Ejecutar cada segundo
setInterval(updateCountdown, 1000);

// Ejecutar una vez al cargar para evitar el 00 inicial
updateCountdown();

setInterval(countdown, 1000);

// Control de Audio
const playBtn = document.getElementById('play-btn');
const music = document.getElementById('bg-music');

playBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        playBtn.innerText = "Pausar Música";
    } else {
        music.pause();
        playBtn.innerText = "Escuchar Música";
    }
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("¡CLABE copiada al portapapeles! Gracias.");
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

document.getElementById('rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;
    const guests = document.getElementById('guests').value || "1";
    const message = document.getElementById('message').value;

    // Tu número de WhatsApp (incluye código de país, ej: 521 para México)
    const tel = "521XXXXXXXXXX"; 

    const text = `¡Hola! Soy ${name}. Confirmo que ${attendance} asistiré a la boda. Número de invitados: ${guests}. Mensaje: ${message}`;
    const encodedText = encodeURIComponent(text);
    
    // Abre WhatsApp en una pestaña nueva
    window.open(`https://wa.me/${tel}?text=${encodedText}`, '_blank');
});