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

document.getElementById('rsvp-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxTpuY7G4iuTx2cao3_rnuvkbK7NnCa0_e5S6zDwVuv0fVx5AZiVX18NFOJjLdKYcZrNA/exec';

    const data = {
        nombre: document.getElementById('name').value,
        asistencia: document.getElementById('attendance').value,
        invitados: document.getElementById('guests').value || "1",
        mensaje: document.getElementById('message').value
    };

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();

        if (result.status === "success") {
            alert("¡Confirmación enviada ❤️!");
            document.getElementById('rsvp-form').reset();
        }

    } catch (error) {
        console.error('Error:', error);
        alert("Hubo un error al enviar la confirmación 😢");
    }
});