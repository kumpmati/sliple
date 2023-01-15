import type { Tile, GoalTile, Grid, LetterTile } from '$lib/types/grid';
import { copy } from '$lib/utils/copy';
import { calculateNextPosition, canMove } from '$lib/utils/grid';
import { normalizeWord } from '$lib/utils/word';
import { derived, writable, type Readable } from 'svelte/store';

export type Direction = 'top' | 'right' | 'left' | 'bottom';

export type GridState = Grid & {
	pendingUpdate: any | null;
};

export type GridStore = Readable<GridState> & {
	moveTile: (id: string, dir: Direction) => void;
	getAt: (x: number, y: number) => Tile[];
	setState: (grid: GridState) => void;
	reset: () => void;
	isAnswer: (value: string) => boolean;
};

/**
 * createGridStore initializes the grid store.
 */
export const createGridStore = (initialState: Grid): GridStore => {
	let _state = copy({ ...initialState, pendingUpdate: null });
	const state = writable<GridState>(_state);

	const moveTile = (id: string, dir: Direction, isUpdate = false) => {
		state.update((prev) => {
			const tile = prev.tiles.find((t) => t.id === id);

			// prevent moving if the tile isn't allowed to move, or
			// if the game is still in the process of updating and
			// the user tries to move a tile.
			if (!tile || !canMove(tile) || (!!prev.pendingUpdate && !isUpdate)) return prev;

			const pos = calculateNextPosition(prev, id, dir);

			// tile has not moved
			if (tile.x === pos.x && tile.y === pos.y) {
				if (prev.pendingUpdate) {
					clearTimeout(prev.pendingUpdate);
					prev.pendingUpdate = null;

					// increment number of taken moves
					prev.numMovesTaken++;
				}

				return prev;
			}

			const d = pos.nextTick;

			// Check if the response requires that the tile should move
			// again after this move is complete
			if (d) {
				// prevent user from moving until the tile stops
				prev.pendingUpdate = setTimeout(() => moveTile(id, d, true), 150);
			} else {
				// no nextTick is specified, stop the update
				clearTimeout(prev.pendingUpdate);
				prev.pendingUpdate = null;

				// increment number of taken moves
				prev.numMovesTaken++;
			}

			// update tile position
			tile.x = pos.x;
			tile.y = pos.y;

			_state = prev;
			return prev;
		});
	};

	const getAt = (x: number, y: number) => {
		const found = _state.tiles.filter((b) => b.x === x && b.y === y);
		return found;
	};

	const setState = (s: GridState) => {
		state.set(s);
	};

	const reset = () => {
		if (_state.pendingUpdate) {
			clearTimeout(_state.pendingUpdate);
		}

		_state = copy({ ...initialState, pendingUpdate: null });
		state.set(_state);
	};

	const isAnswer = (value: string) => {
		return normalizeWord(value) === normalizeWord(_state.solution);
	};

	return {
		subscribe: state.subscribe,
		moveTile: moveTile,
		getAt,
		setState,
		reset,
		isAnswer
	};
};

export const currentWord = (store: GridStore) =>
	derived(store, ($grid) => {
		const goalTiles = $grid.tiles.filter((b) => b.type === 'goal') as GoalTile[];

		const word = new Array(goalTiles.length).fill('_');

		for (const g of goalTiles) {
			const letter = $grid.tiles.find(
				(b) => b.type === 'letter' && b.x === g.x && b.y === g.y
			) as LetterTile;

			if (!letter) {
				word[g.index] = '_';
				continue;
			}

			if (g.letter && letter.letter !== g.letter) {
				word[g.index] = '-';
				continue;
			}

			word[g.index] = letter.letter;
		}

		return word.join('');
	});
