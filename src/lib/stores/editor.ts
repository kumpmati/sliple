import type { Grid } from '$lib/types/grid';
import { writable, type Writable } from 'svelte/store';

export const createEditorStore = (initialState?: Partial<Grid>): Writable<Grid> => {
	return writable<Grid>({
		width: 5,
		height: 5,
		maxMoves: 50,
		numMovesTaken: 0,
		mode: 'predefined',
		solutions: [],
		tiles: [],
		...initialState
	});
};
