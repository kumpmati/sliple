import type { Grid, Tile } from '$lib/types/grid';
import {
	createDirectional,
	createGoal,
	createLetter,
	createSticky,
	createWall
} from '$lib/utils/parse';
import type { Writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';
import { isGoalTile } from '$lib/utils/typeguards';

export type EditorStore = Writable<Grid> & {
	placeTile: <T extends Tile>(type: string, x: number, y: number) => T | null;
};

export const createEditorStore = (initialState?: Partial<Grid>): EditorStore => {
	const state = persisted<Grid>('sliple-editor', {
		width: 5,
		height: 5,
		maxMoves: {
			gold: 50,
			silver: 50,
			bronze: 50
		},
		numMovesTaken: 0,
		solution: '',
		tiles: [],
		...initialState
	});

	return {
		...state,
		placeTile: (type, x, y) => {
			let placedTile = null;

			state.update((prev) => {
				const numGoalTiles = prev.tiles.reduce((t, curr) => (isGoalTile(curr) ? t + 1 : t), 0);

				let tile: Tile | null = null;
				switch (type) {
					case 'wall': {
						tile = createWall(x, y);
						break;
					}
					case 'letter': {
						tile = createLetter(x, y, 's');
						break;
					}
					case 'goal': {
						tile = createGoal(x, y, ['s', numGoalTiles.toString()]);
						break;
					}
					case 'sticky': {
						tile = createSticky(x, y);
						break;
					}

					case 'direction': {
						tile = createDirectional(x, y, 'right');
					}
				}

				if (tile) {
					placedTile = tile;
					prev.tiles = [...prev.tiles, tile];
				}

				return prev;
			});

			return placedTile;
		}
	};
};
