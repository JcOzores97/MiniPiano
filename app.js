document.addEventListener('DOMContentLoaded', app);

function app() {
	//CLASES Y OBJETOS
	class PianoKey {
		//cada instancia de PianoKey tiene como propiedades una referencia a sus elementos html correspondientes (tanto visual como de audio )
		constructor(note, key) {
			this.keyElement = document.getElementById(key);
			this.audioElement = document.getElementById(note);
		}
	}

	const piano = {
		element: document.getElementById('piano'),
		keys: {
			//nombre de cada instancia de  PianoKey  refiere a la letra del teclado que la hace sonar
			A: new PianoKey('Ca', 'A'),
			W: new PianoKey('Db', 'W'),
			S: new PianoKey('Da', 'S'),
			E: new PianoKey('Eb', 'E'),
			D: new PianoKey('Ea', 'D'),
			F: new PianoKey('Fa', 'F'),
			T: new PianoKey('Gb', 'T'),
			G: new PianoKey('Ga', 'G'),
			Y: new PianoKey('Ab', 'Y'),
			H: new PianoKey('Aa', 'H'),
			U: new PianoKey('Bb', 'U'),
			J: new PianoKey('Ba', 'J')
		},
		playNote(keyName) {
			piano.keys[keyName].audioElement.currentTime = 0;
			piano.keys[keyName].audioElement.play();
		}
	};

	const UI = {
		addStyleToKey(keyName) {
			piano.keys[keyName].keyElement.classList.add('activeKey');
		},
		removeStyleFromKey(keyName) {
			//eliminación del estilo en la tecla cuando termina el audio element relacionado con la misma
			piano.keys[keyName].audioElement.addEventListener('ended', () => {
				piano.keys[keyName].keyElement.classList.remove('activeKey');
			});
		}
	};

	//EVENTOS
	//uso del piano clickeado una tecla:
	piano.element.addEventListener('click', (ev) => {
		let clickedKeyName = ev.target.id;
		UI.addStyleToKey(clickedKeyName);
		piano.playNote(clickedKeyName);
		UI.removeStyleFromKey(clickedKeyName);
	});

	//uso del piano usando el teclado
	document.addEventListener('keydown', (ev) => {
		if (ev.repeat) {
			//para evitar sonidos raros al mantener pulsada una letra del teclado
			return;
		}
		const pressedKeyName = ev.key.toUpperCase();
		if (pressedKeyName in piano.keys) {
			UI.addStyleToKey(pressedKeyName);
			piano.playNote(pressedKeyName);
			UI.removeStyleFromKey(pressedKeyName);
		}
	});
}
