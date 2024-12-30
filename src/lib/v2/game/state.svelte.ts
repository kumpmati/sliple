import type { Dir } from '$lib/stores/grid';
import type { CampaignLevel } from '$lib/types/campaign';
import type { Tile } from '$lib/types/grid';
import type { Puzzle } from '$lib/types/puzzle';
import { copy } from '$lib/utils/copy';
import { calculateNextPosition, canMove } from '$lib/utils/grid';
import { isWinStatus, sortTiles } from './utils';

export type HistoryItem = {
	tiles: Tile[];

	// TODO: use these for score verification
	tileId: string;
	dir: Dir;
};

type Callback<T extends EventType> = (d: EventParams<T>) => void;

interface GameStateEventMap {
	move: { tileId: string; dir: Dir };
	end: { type: 'w' | 'l'; moves: Pick<HistoryItem, 'tileId' | 'dir'>[] };
	undo: void;
	reset: void;
	status: 'win' | 'loss' | 'ongoing';
}

type EventType = keyof GameStateEventMap;
type EventParams<T extends EventType> = GameStateEventMap[T];

export class GameState {
	#listeners: Record<string, Callback<any>[]> = {};
	#history = $state<HistoryItem[]>([]);

	puzzle = $state() as Puzzle | CampaignLevel;
	tiles = $state<Tile[]>([]);
	sortedTiles = $derived(sortTiles(this.tiles));

	status = $derived.by<'win' | 'loss' | 'ongoing'>(() => {
		if (isWinStatus(this.tiles)) return 'win';

		if (this.moves >= this.puzzle.data.maxMoves.bronze) {
			return isWinStatus(this.tiles) ? 'win' : 'loss';
		}

		return 'ongoing';
	});

	moves = $derived(this.#history.length);
	canUndo = $derived(this.moves > 0 && this.status === 'ongoing');

	constructor(puzzle: Puzzle | CampaignLevel) {
		this.puzzle = puzzle;
		this.reset(false); // skip emitting 'reset' event so sounds don't play

		// emit 'status' event whenever status changes
		$effect(() => {
			this.#emit('status', this.status);
		});
	}

	setPuzzle(p: Puzzle | CampaignLevel) {
		this.puzzle = p;
		this.reset(false); // skip 'reset' sound
	}

	move(tileId: string, dir: Dir | null) {
		if (this.status !== 'ongoing' || !this.puzzle) {
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
		this.#snapshot(tileId, dir);

		tile.x = pos.x;
		tile.y = pos.y;
		this.#emit('move', { tileId, dir });

		if (isWinStatus(this.tiles)) {
			this.#emit('end', { type: 'w', moves: this.#getMoveHistory() });
		} else {
			if (this.moves >= this.puzzle.data.maxMoves.bronze) {
				this.#emit('end', { type: 'l', moves: this.#getMoveHistory() });
			}
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

	#getMoveHistory() {
		return this.#history.map((h) => ({ tileId: h.tileId, dir: h.dir }));
	}

	#emit<T extends EventType>(event: T, data: EventParams<T>) {
		this.#listeners[event]?.forEach((cb) => cb(data));
	}

	#restoreSnapshot(h: HistoryItem) {
		this.tiles = copy(h.tiles);
	}

	#snapshot(tileId: string, dir: Dir) {
		this.#history.push({ tiles: copy(this.tiles), tileId, dir });
	}
}
