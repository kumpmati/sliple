import type { SfxContext } from '$lib/stores/sound';
import { EndType } from '../persisted/types';
import type { GameState } from './state.svelte';

export class GameSounds {
	#game: GameState;
	#ctx: SfxContext;
	#unsubs: (() => void)[];

	constructor(g: GameState, ctx: SfxContext) {
		this.#game = g;
		this.#ctx = ctx;
		this.#unsubs = [];
		this.#connect();
	}

	/**
	 * Initialises all game sound effects
	 */
	#connect() {
		this.#ctx.current?.init();

		this.#unsubs.push(
			this.#game.on('move', () => {
				this.#ctx.current?.play('swipe');
				this.#ctx.current?.play('click', 150);
			}),
			this.#game.on('end', ({ type }) => {
				this.#ctx.current?.play(type === EndType.WIN ? 'win' : 'lose', 300);
			}),
			this.#game.on('undo', () => this.#ctx.current?.play('undo')),
			this.#game.on('reset', () => this.#ctx.current?.play('reset'))
		);
	}

	disconnect() {
		this.#unsubs.forEach((unsubscribe) => unsubscribe());
		this.#unsubs = [];
	}
}
