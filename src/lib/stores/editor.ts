import type { Grid, Tile } from '$lib/types/grid';
import { createGoal, createLetter, createSticky, createWall } from '$lib/utils/parse';
import { writable, type Writable } from 'svelte/store';

export type EditorStore = Writable<Grid> & {
	placeTile: (type: string, x: number, y: number) => void;
};

export const createEditorStore = (initialState?: Partial<Grid>): EditorStore => {
	const state = writable<Grid>({
		width: 5,
		height: 5,
		maxMoves: 50,
		numMovesTaken: 0,
		mode: 'predefined',
		solutions: [],
		tiles: [],
		...initialState
	});

	return {
		...state,
		placeTile: (type, x, y) => {
			state.update((prev) => {
				const highestIndex = prev.tiles.reduce((t, curr) => (curr.type === 'goal' ? t + 1 : t), -1);

				let tile: Tile | null = null;
				switch (type) {
					case 'wall': {
						tile = createWall(x, y);
						break;
					}
					case 'letter': {
						tile = createLetter(x, y, 'A');
						break;
					}
					case 'goal': {
						tile = createGoal(x, y, ['A', (highestIndex + 1).toString()]);
						break;
					}
					case 'sticky': {
						tile = createSticky(x, y);
						break;
					}
				}

				if (tile) {
					prev.tiles = [...prev.tiles, tile];
				}

				return prev;
			});
		}
	};
};
