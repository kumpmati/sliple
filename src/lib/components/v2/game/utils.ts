import type { GoalTile, LetterTile, Tile, TileTypes } from '$lib/types/grid';
import { isGoalTile, isLetterTile } from '$lib/utils/typeguards';

type LetterStatus = {
	status: 'none' | 'valid' | 'invalid';
	goalLetter?: string;
};

export const getLetterStatus = (tiles: Tile[], tile: LetterTile): LetterStatus => {
	const goal = tiles.find((t): t is GoalTile => isGoalTile(t) && t.x == tile.x && t.y === tile.y);
	if (!goal) return { status: 'none' };

	return {
		status: goal.letter === tile.letter ? 'valid' : 'invalid',
		goalLetter: goal.letter
	};
};

const TILE_TYPE_DRAW_ORDER: Record<TileTypes['type'], number> = {
	letter: 5,
	l: 5,
	wall: 5,
	w: 5,
	goal: 4,
	g: 4,
	direction: 3,
	d: 3,
	sticky: 2,
	s: 2
};

export const sortTiles = (t: Tile[]) => {
	return t.toSorted((a, b) => {
		const typeOrder =
			TILE_TYPE_DRAW_ORDER[a.type as TileTypes['type']] -
			TILE_TYPE_DRAW_ORDER[b.type as TileTypes['type']];

		if (typeOrder !== 0) return typeOrder;
		return a.y - b.y;
	});
};

export const isWinStatus = (tiles: Tile[]) => {
	return tiles
		.filter((t) => isLetterTile(t))
		.every((t) => getLetterStatus(tiles, t).status === 'valid');
};
