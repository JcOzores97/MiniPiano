import piano from './modules/piano.js';
import UI from './modules/ui.js';

document.addEventListener('DOMContentLoaded', app);

function app() {
	const pianoElement = document.getElementById('piano');
	let isRecording = false;
	//EVENTOS
	//uso del piano clickeado una tecla:
	pianoElement.addEventListener('click', (ev) => {
		let clickedKeyElement = ev.target;
		let clickedKeyAudio = piano.pianoKeys.find((pianoKey) => pianoKey.key === clickedKeyElement.id).audioElement;
		UI.addStyleToKey(clickedKeyElement);
		piano.playNote(clickedKeyAudio);
		UI.removeStyleFromKeyWhenAudioFinishes(clickedKeyElement, clickedKeyAudio);
	});

	//uso del piano usando el teclado
	document.addEventListener('keydown', (ev) => {
		if (ev.repeat) {
			//para evitar sonidos raros al mantener pulsada una letra del teclado
			return;
		}
		const pressedKey = ev.key.toUpperCase();
		const pressedKeyElement = document.getElementById(pressedKey);
		if (pressedKeyElement == null) {
			return;
		}
		const pressedKeyAudio = piano.pianoKeys.find((pianoKey) => pianoKey.key === pressedKey).audioElement;
		UI.addStyleToKey(pressedKeyElement);
		piano.playNote(pressedKeyAudio);
		UI.removeStyleFromKeyWhenAudioFinishes(pressedKeyElement, pressedKeyAudio);
	});

	//grabación-reproducción
	document.getElementById('record-button').addEventListener('click', (ev) => {
		if (isRecording == false) {
			isRecording = true;
			piano.recordedNotes = [];
			piano.recordStart = Date.now();
			ev.currentTarget.classList.replace('not-recording', 'recording');
			document.getElementById('play-button').classList.add('hide');
			piano.pianoKeys.forEach((pianoKey) => {
				pianoKey.audioElement.addEventListener('play', piano.recordNotes);
			});
			return;
		}
		if (isRecording == true) {
			isRecording = false;
			piano.recordFinish = Date.now();
			ev.currentTarget.classList.replace('recording', 'not-recording');
			if (piano.recordedNotes.length >= 1) {
				document.getElementById('play-button').classList.remove('hide');
			}
			piano.pianoKeys.forEach((pianoKey) => {
				pianoKey.audioElement.removeEventListener('play', piano.recordNotes);
			});
		}
	});

	document.getElementById('play-button').addEventListener('click', () => {
		piano.playRecordedNotes();
		const recordTotalTime = (piano.recordFinish - piano.recordStart) / 1000; //en segundos
		document.documentElement.style.setProperty('--progress-bar-fill-duration', `${recordTotalTime}s`);
		const progressBar = document.querySelector('.progress-bar-content');
		progressBar.classList.add('progress-bar-content-animation');
		progressBar.addEventListener('animationend', () => {
			progressBar.classList.remove('progress-bar-content-animation');
		});
	});
}
