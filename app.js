document.addEventListener('DOMContentLoaded', app);

function app() {
	//CLASES Y OBJETOS
	class PianoKey {
		//cada instancia de PianoKey tiene como propiedades una referencia a sus elementos html correspondientes (tanto visual como de audio )
		constructor(note, key) {
			this.keyElement = document.getElementById(key);
			this.audioElement = document.getElementById(note);
			this.note = note;
			this.key = key;
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
		},
		isRecording: false,
		recordNotes() {
			const note = event.target.id;
			let key;
			//búsqueda de la letra que hace sonar a la nota
			for (let pianoKeyName in piano.keys) {
				if (piano.keys[pianoKeyName].note == note) {
					key = piano.keys[pianoKeyName].key;
				}
			}
			const timeSinceStart = Date.now() - piano.recordStart;
			piano.recordedNotes.push({ key, note, timeSinceStart });
		},
		recordedNotes: [],
		playRecordedNotes() {
			if (piano.recordedNotes.length == 0) {
				return;
			}
			piano.recordedNotes.forEach((recordedNote) => {
				setTimeout(() => {
					piano.playNote(recordedNote.key);
					UI.addStyleToKey(recordedNote.key);
					UI.removeStyleFromKeyWhenAudioFinishes(recordedNote.key);
				}, recordedNote.timeSinceStart);
			});
		}
	};

	const UI = {
		addStyleToKey(keyName) {
			piano.keys[keyName].keyElement.classList.add('activeKey');
		},
		removeStyleFromKeyWhenAudioFinishes(keyName) {
			//eliminación del estilo en la tecla cuando termina el audio  relacionado con la misma
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
		UI.removeStyleFromKeyWhenAudioFinishes(clickedKeyName);
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
			UI.removeStyleFromKeyWhenAudioFinishes(pressedKeyName);
		}
	});

	//grabación-reproducción
	document.getElementById('record-button').addEventListener('click', (ev) => {
		if (piano.isRecording == false) {
			piano.isRecording = true;
			piano.recordedNotes = []; //limpieza de notas grabadas previamente si es que las hay
			piano.recordStart = Date.now();
			ev.currentTarget.classList.replace('not-recording', 'recording');
			document.getElementById('play-button').classList.add('hide');
			for (let pianoKey in piano.keys) {
				piano.keys[pianoKey].audioElement.addEventListener('play', piano.recordNotes);
			}
			return;
		}
		if (piano.isRecording == true) {
			piano.isRecording = false;
			ev.currentTarget.classList.replace('recording', 'not-recording');
			if (piano.recordedNotes.length >= 1) {
				document.getElementById('play-button').classList.remove('hide');
			}
			for (let pianoKey in piano.keys) {
				piano.keys[pianoKey].audioElement.removeEventListener('play', piano.recordNotes);
			}
		}
	});

	document.getElementById('play-button').addEventListener('click', piano.playRecordedNotes);
}
