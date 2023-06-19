import type { Tile, GoalTile, Grid, LetterTile } from '$lib/types/grid';
import { calculateNextPosition, canMove } from '$lib/utils/grid';
import { normalizeWord } from '$lib/utils/word';
import { derived, get, type Readable } from 'svelte/store';
import { undoable } from '@macfja/svelte-undoable';
import { produce } from 'immer';

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
	undo: () => void;
};

/**
 * createGridStore initializes the grid store.
 */
export const createGridStore = (initialState: Grid): GridStore => {
	const state = undoable<GridState & { pendingUpdate: any }>({
		...initialState,
		pendingUpdate: null
	});

	const moveTile = (id: string, dir: Direction, isUpdate = false) => {
		state.update((prev) => {
			return produce(prev, (draft) => {
				const tile = draft.tiles.find((t) => t.id === id);

				// prevent moving if the tile isn't allowed to move, or
				// if the game is still in the process of updating and
				// the user tries to move a tile.
				if (!tile || !canMove(tile) || (!!draft.pendingUpdate && !isUpdate)) return;

				const pos = calculateNextPosition(draft, id, dir);

				// tile has not moved
				if (tile.x === pos.x && tile.y === pos.y) {
					if (draft.pendingUpdate) {
						clearTimeout(draft.pendingUpdate);
						draft.pendingUpdate = null;

						// increment number of taken moves
						draft.numMovesTaken++;
					}

					return;
				}

				const d = pos.nextTick;

				// Check if the response requires that the tile should move
				// again after this move is complete
				if (d) {
					// prevent user from moving until the tile stops
					draft.pendingUpdate = setTimeout(() => moveTile(id, d, true), 150);
				} else {
					// no nextTick is specified, stop the update
					clearTimeout(draft.pendingUpdate);
					draft.pendingUpdate = null;

					// increment number of taken moves
					draft.numMovesTaken++;
				}

				// update tile position
				tile.x = pos.x;
				tile.y = pos.y;
				return;
			});
		});
	};

	const getAt = (x: number, y: number) => get(state).tiles.filter((b) => b.x === x && b.y === y);

	const reset = () => {
		const s = get(state);

		if (s.pendingUpdate) {
			clearTimeout(s.pendingUpdate);
		}

		state.reset();
	};

	const isAnswer = (value: string) => {
		return normalizeWord(value) === normalizeWord(get(state).solution);
	};

	return {
		subscribe: state.subscribe,
		moveTile: moveTile,
		getAt,
		setState: state.set,
		reset,
		isAnswer,
		undo: state.undo
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
