import type { Dir } from '$lib/stores/grid';
import type { Grid, Tile } from '$lib/types/grid';
import { calculateNextPosition, canMove } from '$lib/utils/grid';

export const moveTile = (
	puzzle: Pick<Grid, 'tiles' | 'width' | 'height'>,
	tiles: Tile[],
	tileId: string,
	dir: Dir
): Tile[] | null => {
	const tile = tiles.find((t) => t.id === tileId);

	if (!dir || !tile || !canMove(tile)) {
		return null;
	}

	const pos = calculateNextPosition({ ...puzzle, tiles }, tile.id, dir);

	if (tile.x === pos.x && tile.y === pos.y) {
		// hasn't moved, skip
		return null;
	}

	tile.x = pos.x;
	tile.y = pos.y;

	return tiles;
};
