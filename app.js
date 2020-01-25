document.addEventListener('DOMContentLoaded', piano);

function piano() {
	//Cada instancia de PianoKey tiene como propiedades una referencia a sus elementos html correspondientes (tanto visual como de audio )
	class PianoKey {
		constructor(note, key) {
			this.note = note;
			this.key = key;
			this.keyElement = document.getElementById(key);
			this.audioElement = document.getElementById(note);
		}
		get playNote() {
			this.audioElement.currentTime = 0;
			this.audioElement.play();
		}
		get addStyleToKey() {
			this.keyElement.classList.add('activeKey');
		}
		get removeStyleFromKey() {
			//solo aplicable una vez que se reprodujo el audioElement
			this.audioElement.addEventListener('ended', () => this.keyElement.classList.remove('activeKey'));
		}
	}

	//nombre de cada instancia de  PianoKey  refiere a la letra del teclado que la hace sonar
	let A = new PianoKey('Ca', 'A');
	let W = new PianoKey('Db', 'W');
	let S = new PianoKey('Da', 'S');
	let E = new PianoKey('Eb', 'E');
	let D = new PianoKey('Ea', 'D');
	let F = new PianoKey('Fa', 'F');
	let T = new PianoKey('Gb', 'T');
	let G = new PianoKey('Ga', 'G');
	let Y = new PianoKey('Ab', 'Y');
	let H = new PianoKey('Aa', 'H');
	let U = new PianoKey('Bb', 'U');
	let J = new PianoKey('Ba', 'J');

	const pianoKeys = [ A, W, S, E, D, F, T, G, Y, H, U, J ];

	//uso del piano clickeado una tecla:
	for (let i = 0; i < pianoKeys.length; i++) {
		pianoKeys[i].keyElement.addEventListener('click', () => {
			pianoKeys[i].playNote;
			pianoKeys[i].addStyleToKey;
			pianoKeys[i].removeStyleFromKey;
		});
	}

	//uso del piano usando el teclado
	document.addEventListener('keydown', (ev) => {
		if (ev.repeat) {
			//para evitar sonidos raros al mantener pulsada una letra del teclado
			return;
		}
		const pressedKey = ev.key.toUpperCase();
		//se busca en el array PianoKeys el objeto cuyo valor de la propiedad "key" es igual al valor de "pressedKey"
		const keyToPlay = pianoKeys.filter((pianoKey) => pianoKey.key == pressedKey);
		if (keyToPlay.length == 1) {
			keyToPlay[0].playNote;
			keyToPlay[0].addStyleToKey;
			keyToPlay[0].removeStyleFromKey;
		}
	});
}
