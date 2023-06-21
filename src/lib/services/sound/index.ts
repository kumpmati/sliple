import { soundsEnabled } from '$lib/stores/sound';
import { Howl } from 'howler';
import { get } from 'svelte/store';

export class GameAudio {
	private sounds;

	constructor() {
		this.sounds = {
			click: new Howl({ src: ['/sound/click.ogg', '/sound/click.mp3'], volume: 0.25 }),
			swipe: new Howl({ src: ['/sound/swipe.ogg', '/sound/swipe.mp3'], volume: 0.25 }),
			reset: new Howl({ src: ['/sound/reset.ogg', '/sound/reset.mp3'], volume: 0.5 }),
			undo: new Howl({ src: ['/sound/undo.ogg', '/sound/undo.mp3'] }),
			win: new Howl({ src: ['/sound/win.ogg', '/sound/win.mp3'] }),
			lose: new Howl({ src: ['/sound/lose.ogg', '/sound/lose.mp3'] }),
			hit: new Howl({ src: ['/sound/hit.ogg', '/sound/hit.mp3'] })
		} as const;
	}

	public init() {
		Object.values(this.sounds).forEach((snd) => snd.load());
	}

	public play(sound: keyof typeof this.sounds, delay = 0) {
		if (!get(soundsEnabled)) return;
		setTimeout(() => this.sounds[sound].play(), delay);
	}
}
