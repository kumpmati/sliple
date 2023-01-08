import type { Tile, GoalTile, Grid_v2, LetterTile } from '$lib/types/grid';
import { copy } from '$lib/utils/copy';
import { calculateNextPosition, canMove } from '$lib/utils/grid';
import { normalizeWord } from '$lib/utils/word';
import { derived, writable, type Readable } from 'svelte/store';

export type Direction = 'top' | 'right' | 'left' | 'bottom';

export type GridStore = Readable<Grid_v2> & {
	moveTile: (id: string, dir: Direction) => void;
	getAt: (x: number, y: number) => Tile[];
	setState: (grid: Grid_v2) => void;
	reset: () => void;
	isAnswer: (value: string) => boolean;
};

/**
 * createGridStore initializes the grid store.
 */
export const createGridStore = (initialState: Grid_v2): GridStore => {
	let _state = copy(initialState);
	const state = writable<Grid_v2>(_state);

	const moveTile = (id: string, dir: Direction) => {
		state.update((prev) => {
			const tile = prev.tiles.find((t) => t.id === id);
			if (!tile || !canMove(tile)) return prev;

			const pos = calculateNextPosition(prev, id, dir);
			if (tile.x === pos.x && tile.y === pos.y) {
				return prev;
			}

			// update tile position
			tile.x = pos.x;
			tile.y = pos.y;

			// increment number of taken moves
			prev.numMovesTaken++;

			_state = prev;
			return prev;
		});
	};

	const getAt = (x: number, y: number) => {
		const found = _state.tiles.filter((b) => b.x === x && b.y === y);
		return found;
	};

	const setState = (s: Grid_v2) => {
		state.set(s);
	};

	const reset = () => {
		_state = copy(initialState);
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
