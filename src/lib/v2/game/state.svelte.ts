import type { Direction } from '$lib/stores/grid';
import type { Tile } from '$lib/types/grid';
import type { Puzzle } from '$lib/types/puzzle';
import { copy } from '$lib/utils/copy';
import { calculateNextPosition, canMove } from '$lib/utils/grid';
import { isWinStatus, sortTiles } from './utils';

type HistoryItem = {
	tiles: Tile[];
};

type Callback<T extends EventType> = (d: EventParams<T>) => void;

interface GameStateEventMap {
	move: { tileId: string; dir: Direction };
	end: { type: 'w' | 'l'; moves: number };
	undo: void;
	reset: void;
}

type EventType = keyof GameStateEventMap;
type EventParams<T extends EventType> = GameStateEventMap[T];

export class GameState {
	#listeners: Record<string, Callback<any>[]> = {};
	#history = $state<HistoryItem[]>([]);

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	puzzle = $state<Puzzle>()!;
	tiles = $state<Tile[]>([]);
	sortedTiles = $derived(sortTiles(this.tiles));

	moves = $derived(this.#history.length);
	isWin = $derived(isWinStatus(this.tiles));
	canUndo = $derived(this.moves > 0 && !this.isWin);

	constructor(puzzle: Puzzle) {
		this.puzzle = puzzle;
		this.reset(false);
	}

	setPuzzle(p: Puzzle) {
		this.puzzle = p;
		this.reset();
	}

	move(tileId: string, dir: Direction | null) {
		if (this.isWin || !this.puzzle) {
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
		this.#emit('move', { tileId, dir });

		if (isWinStatus(this.tiles)) {
			this.#emit('end', { type: 'w', moves: this.moves });
		}
	}

	undo() {
		if (!this.canUndo) return;

		const last = this.#history.pop();
		if (!last) {
			throw new Error('cannot undo: no previous move');
		}

		this.#restoreSnapshot(last);
		this.#emit('undo', void 0);
	}

	reset(emit = true) {
		if (!this.puzzle) {
			return;
		}

		this.tiles = copy(this.puzzle.data.tiles);
		this.#history = [];

		if (emit) {
			this.#emit('reset', void 0);
		}
	}

	on<T extends EventType>(event: T, callback: Callback<T>) {
		this.#listeners[event] ??= [];
		this.#listeners[event].push(callback);

		return () => this.off(event, callback);
	}

	off<T extends EventType>(event: string, cb: Callback<T>) {
		if (this.#listeners[event]) {
			this.#listeners[event].splice(this.#listeners[event].indexOf(cb), 1);
		}
	}

	#emit<T extends EventType>(event: T, data: EventParams<T>) {
		this.#listeners[event]?.forEach((cb) => cb(data));
	}

	#restoreSnapshot(h: HistoryItem) {
		this.tiles = copy(h.tiles);
	}

	#snapshot() {
		this.#history.push({ tiles: copy(this.tiles) });
	}
}
