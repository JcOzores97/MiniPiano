import UI from './ui.js';
class PianoKey {
	constructor(note, key) {
		this.note = note;
		this.key = key;
		this.keyElement = document.getElementById(key);
		this.audioElement = document.getElementById(note);
	}
}

const piano = {
	pianoKeys: [
		new PianoKey('Ca', 'A'),
		new PianoKey('Db', 'W'),
		new PianoKey('Da', 'S'),
		new PianoKey('Eb', 'E'),
		new PianoKey('Ea', 'D'),
		new PianoKey('Fa', 'F'),
		new PianoKey('Gb', 'T'),
		new PianoKey('Ga', 'G'),
		new PianoKey('Ab', 'Y'),
		new PianoKey('Aa', 'H'),
		new PianoKey('Bb', 'U'),
		new PianoKey('Ba', 'J')
	],
	recordStart: undefined,
	recordedNotes: [],
	recordNotes(ev) {
		const note = ev.target.id;
		const timeSinceStart = Date.now() - piano.recordStart;
		piano.recordedNotes.push({ note, timeSinceStart });
	},
	playRecordedNotes() {
		if (piano.recordedNotes.length == 0) {
			return;
		}
		piano.recordedNotes.forEach((recordedNote) => {
			let audioElement = piano.pianoKeys.find((pianoKey) => pianoKey.note == recordedNote.note).audioElement;
			let keyElement = piano.pianoKeys.find((pianoKey) => pianoKey.note == recordedNote.note).keyElement;
			setTimeout(() => {
				piano.playNote(audioElement);
				UI.addStyleToKey(keyElement);
				UI.removeStyleFromKeyWhenAudioFinishes(keyElement, audioElement);
			}, recordedNote.timeSinceStart);
		});
	},
	playNote(audioElement) {
		audioElement.currentTime = 0;
		audioElement.play();
	}
};
export default piano;
