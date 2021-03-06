const UI = {
	addStyleToKey(keyElement) {
		keyElement.classList.add('activeKey');
	},
	removeStyleFromKeyWhenAudioFinishes(keyElement, audioElement) {
		//eliminación del estilo en la tecla cuando termina el audio  relacionado con la misma
		audioElement.addEventListener('ended', () => {
			keyElement.classList.remove('activeKey');
		});
	},
	blinkIcon(iconElement) {
		iconElement.classList.add('blinkIcon');
	},
	removeBlinkFromIcon(iconElement) {
		iconElement.classList.remove('blinkIcon');
	}
};
export default UI;
