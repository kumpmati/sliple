import type { Direction } from '$lib/stores/grid';
import type { Tile } from '$lib/types/grid';
import type { Puzzle } from '$lib/types/puzzle';
import { copy } from '$lib/utils/copy';
import { calculateNextPosition, canMove } from '$lib/utils/grid';
import { isWinStatus, sortTiles } from './utils';

type HistoryItem = {
	tiles: Tile[];
};

type Callback = () => void;

export class GameState {
	#listeners: Record<string, Callback[]> = {};
	#history = $state<HistoryItem[]>([]);

	puzzle: Puzzle;
	tiles = $state<Tile[]>([]);
	sortedTiles = $derived(sortTiles(this.tiles));

	moves = $derived(this.#history.length);
	isWin = $derived(isWinStatus(this.tiles));
	canUndo = $derived(this.moves > 0 && !this.isWin);

	constructor(puzzle: Puzzle) {
		this.puzzle = puzzle; // prevent ts from complaining
		this.reset();
	}

	move(tileId: string, dir: Direction | null) {
		if (this.isWin) {
			return; // can't move when game is over
		}

		const tile = this.tiles.find((t) => t.id === tileId);

		if (!dir || !tile || !canMove(tile)) {
			return;
		}

		const pos = calculateNextPosition({ ...this.puzzle.data, tiles: this.tiles }, tile.id, dir);

		if (tile.x === pos.x && tile.y === pos.y) {
			// hasn't moved, skip
			return;
		}

		// save state before committing to the move so undoing is easier
		this.#snapshot();

		tile.x = pos.x;
		tile.y = pos.y;
		this.#emit('move');

		if (isWinStatus(this.tiles)) {
			this.#emit('win');
		}
	}

	undo() {
		if (!this.canUndo) return;

		const last = this.#history.pop();
		if (!last) {
			throw new Error('cannot undo: no previous move');
		}

		this.#restoreSnapshot(last);
		this.#emit('undo');
	}

	reset() {
		this.tiles = copy(this.puzzle.data.tiles);
		this.#history = [];
	}

	on(event: string, callback: Callback) {
		this.#listeners[event] ??= [];
		this.#listeners[event].push(callback);
	}

	off(event: string, cb: Callback) {
		if (this.#listeners[event]) {
			this.#listeners[event].splice(this.#listeners[event].indexOf(cb), 1);
		}
	}

	#emit(event: string) {
		this.#listeners[event]?.forEach((cb) => cb());
	}

	#restoreSnapshot(h: HistoryItem) {
		this.tiles = copy(h.tiles);
	}

	#snapshot() {
		this.#history.push({ tiles: copy(this.tiles) });
	}
}
