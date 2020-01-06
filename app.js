document.addEventListener('DOMContentLoaded', piano);

function piano() {
	const teclasPiano = document.querySelectorAll('.key');
	const arrTeclasPiano = [ ...teclasPiano ];

	//relación letras del teclado (propertyNames) con notas del piano (propertyValues);.
	const teclasVinculadas = {
		A: 'C',
		W: 'Db',
		S: 'D',
		E: 'Eb',
		D: 'E',
		F: 'F',
		T: 'Gb',
		G: 'G',
		Y: 'Ab',
		H: 'A',
		U: 'Bb',
		J: 'B'
	};
	let audio;

	//EventListener para escuchar nota por haber clickeado una tecla:
	teclasPiano.forEach((teclaPiano) => {
		teclaPiano.addEventListener('click', () => {
			tocarNotaPorClick(teclaPiano);
			estilizarTeclaPiano(teclaPiano);
		});
	});

	function tocarNotaPorClick(teclaClikeada) {
		//obtención de elemento de audio correspondiete a la tecla clickeada
		audio = document.getElementById(teclaClikeada.dataset.note);
		tocarNota();
	}

	//EventListener para Escuchar nota por uso del teclado
	document.addEventListener('keydown', (evento) => {
		if (evento.repeat) {
			//para evitar sonidos raros al mantener pulsada una letra del teclado
			return;
		}
		const letraPulsada = evento.key.toUpperCase();
		if (teclasVinculadas.hasOwnProperty(letraPulsada) == true) {
			//Se escucha nota en el caso de que la letraPulsada tenga una tecla relacionada.
			tocarNotaPorTeclado(letraPulsada);
			const elementoTecla = obtenerElementoTecla(letraPulsada);
			estilizarTeclaPiano(elementoTecla);
		}
	});

	function tocarNotaPorTeclado(letra) {
		//obtención de elemento de audio correspondiete a la nota
		audio = document.getElementById(teclasVinculadas[letra]);
		tocarNota();
	}

	function tocarNota() {
		audio.currentTime = 0;
		audio.play();
	}

	function obtenerElementoTecla(letra) {
		//se filtra array de teclas para quedarse solo con la pulsada por el usuario
		const arrElementoTecla = arrTeclasPiano.filter((teclaPiano) => {
			if (teclaPiano.textContent == letra) {
				return true;
			}
		});
		return arrElementoTecla[0];
	}

	function estilizarTeclaPiano(tecla) {
		tecla.classList.add('activeKey');
		//se quitan los estilos cuando termina el audio
		audio.addEventListener('ended', () => {
			tecla.classList.remove('activeKey');
		});
	}
}
