import type { Block, Grid } from '$lib/types/grid';
import { calculateNextPosition, canMove } from '$lib/utils/grid';
import { writable, type Readable } from 'svelte/store';

export type Direction = 'top' | 'right' | 'left' | 'bottom';

export type GridStore = Readable<Grid> & {
	moveBlock: (id: string, dir: Direction) => void;
	getAt: (x: number, y: number) => Block[];
};

/**
 * createGridStore initializes the grid store.
 */
export const createGridStore = (initialState: Grid): GridStore => {
	let _state = initialState; // copy

	const state = writable<Grid>(initialState);

	const moveBlock = (id: string, dir: Direction) => {
		state.update((prev) => {
			const block = prev.blocks.find((b) => b.id === id);
			if (!block || !canMove(block)) return prev;

			const pos = calculateNextPosition(prev, id, dir);
			if (!pos) return prev;

			block.x = pos.x;
			block.y = pos.y;

			_state = prev;

			return prev;
		});
	};

	const getAt = (x: number, y: number) => {
		const found = _state.blocks.filter((b) => b.x === x && b.y === y);
		return found;
	};

	return {
		subscribe: state.subscribe,
		moveBlock,
		getAt
	};
};
