import type { Grid } from '$lib/types/grid';
import { calculateNextPosition, canMove } from '$lib/utils/grid';
import { writable, type Readable } from 'svelte/store';

export type Direction = 'top' | 'right' | 'left' | 'bottom';

export type GridStore = Readable<Grid> & {
	moveBlock: (id: string, dir: Direction) => void;
};

/**
 * createGridStore initializes the grid store.
 */
export const createGridStore = (initialState: Grid): GridStore => {
	const state = writable<Grid>(initialState);

	const moveTile = (id: string, dir: Direction) => {
		state.update((prev) => {
			const block = prev.blocks.find((b) => b.id === id);
			if (!block || !canMove(block)) return prev;

			const pos = calculateNextPosition(prev, id, dir);
			if (!pos) return prev;

			block.x = pos.x;
			block.y = pos.y;

			return prev;
		});
	};

	return {
		subscribe: state.subscribe,
		moveBlock: moveTile
	};
};
