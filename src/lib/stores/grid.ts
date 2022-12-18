import type { Tile, GoalTile, Grid, LetterTile } from '$lib/types/grid';
import { calculateNextPosition, canMove } from '$lib/utils/grid';
import { derived, writable, type Readable } from 'svelte/store';

export type Direction = 'top' | 'right' | 'left' | 'bottom';

export type GridStore = Readable<Grid> & {
	moveTile: (id: string, dir: Direction) => void;
	getAt: (x: number, y: number) => Tile[];
};

/**
 * createGridStore initializes the grid store.
 */
export const createGridStore = (initialState: Grid): GridStore => {
	let _state = initialState; // copy

	const state = writable<Grid>(initialState);

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

	return {
		subscribe: state.subscribe,
		moveTile: moveTile,
		getAt
	};
};

export const currentWord = (store: GridStore) =>
	derived(store, ($grid) => {
		const goalTiles = $grid.tiles.filter((b) => b.type === 'goal') as GoalTile[];

		const word = new Array(goalTiles.length).fill('_');

		for (const g of goalTiles) {
			const letter = $grid.tiles.find((b) => b.type === 'letter' && b.x === g.x && b.y === g.y);
			word[g.index] = letter ? (letter as LetterTile).letter : '_';
		}

		return word.join('');
	});
