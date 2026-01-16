function redimensionaBarra() {
	if (!medio.ended) {
		var total = parseInt(medio.currentTime * maximo / medio.duration);
		progreso.style.width = total + 'px';
	}
	else {
		progreso.style.width = '0px';
		play.value = '\u25BA';
		window.clearInterval(bucle);
	}
}

function desplazarMedio(e) {
	if (!medio.paused && !medio.ended) {
		var ratonX = e.pageX - barra.offsetLeft;
		var nuevoTiempo = ratonX * medio.duration / maximo;
		medio.currentTime = nuevoTiempo;
		progreso.style.width = ratonX + 'px';
	}
}

function accionPlay() {
	if (!medio.paused && !medio.ended) {
		medio.pause();
		play.value = '\u25BA';
		window.clearInterval(bucle);
	}
	else {
		medio.play();
		play.value = '||';
		bucle = setInterval(redimensionaBarra, 1000);
	}
}

/*Función para reiniciar el video*/
function reiniciarVideo() {
	medio.currentTime = 0;
	progreso.style.width = '0px'; /*La barra vuelve al incio*/
	if (medio.paused) {
		medio.play();
		play.value = '||';
		bucle = setInterval(redimensionaBarra, 1000);
	}
}

/*Función para retrasar el video 5s*/
function retrasarVideo() {
	if (medio.currentTime > 5) {
		medio.currentTime -= 5;
	} else {
		medio.currentTime = 0; /*Por si el video queda en el inicio*/
	}
	redimensionaBarra();
}

/*Función para adelantar el video 5s*/
function adelantarVideo() {
	if (medio.currentTime + 5 < medio.duration) {
		medio.currentTime += 5;
	} else {
		medio.currentTime = medio.duration - 0.1; /*Por si el video llega al final al adelantarlo para que quede 1s antes de acabarse*/
	}
	redimensionaBarra();
}

/*Función para silenciar o escuchar el video*/
function silenciarVideo() {
	if (medio.muted) {
		medio.muted = false;
		silenciar.value = 'silenciar';
	} else {
		medio.muted = true;
		silenciar.value = 'escuchar';
	}
}

/*Función para bajar el volumen 0.1*/
function bajarVolumen() {
	if (medio.volume > 0) {
		medio.volume = Math.max(0, medio.volume - 0.1);
	}
}

/*Función para subir el volumen 0.1*/
function subirVolumen() {
	if (medio.volume < 1) {
		medio.volume = Math.min(1, medio.volume + 0.1);
	}
}

function iniciar() {
	maximo = 700;

	medio = document.getElementById('medio');
	barra = document.getElementById('barra');
	progreso = document.getElementById('progreso');
	play = document.getElementById('play');
	reiniciar = document.getElementById('reiniciar');
    retrasar = document.getElementById('retrasar');
    adelantar = document.getElementById('adelantar');
    silenciar = document.getElementById('silenciar');
    menosVolumen = document.getElementById('menosVolumen');
    masVolumen = document.getElementById('masVolumen');

	play.addEventListener('click', accionPlay, false);
	reiniciar.addEventListener('click', reiniciarVideo, false);
    retrasar.addEventListener('click', retrasarVideo, false);
    adelantar.addEventListener('click', adelantarVideo, false);
    silenciar.addEventListener('click', silenciarVideo, false);
    menosVolumen.addEventListener('click', bajarVolumen, false);
    masVolumen.addEventListener('click', subirVolumen, false);

	barra.addEventListener('click', desplazarMedio, false);
}

window.addEventListener('load', iniciar, false);