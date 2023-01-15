import type { Direction } from '$lib/stores/grid';
import type { Tile, Grid, Coordinates, CollisionType } from '$lib/types/grid';
import type { CompletionRank } from '$lib/types/user';
import { clamp } from './math';

export const getRank = (grid: Grid, moves: number): CompletionRank | null => {
	if (moves <= grid.maxMoves.gold) return 'gold';
	if (moves <= grid.maxMoves.silver) return 'silver';
	if (moves <= grid.maxMoves.bronze) return 'bronze';
	return null;
};

/**
 * Returns true if `a` is the same rank or a higher rank than `b`
 */
export const isHigherRank = (a: CompletionRank | null, b: CompletionRank | null): boolean => {
	const ranks = ['gold', 'silver', 'bronze', null, undefined];

	const aIndex = ranks.indexOf(a);
	const bIndex = ranks.indexOf(b);

	return aIndex <= bIndex;
};

export type NextPositionResult = Coordinates & {
	nextTick?: Direction;
};

/**
 * calculateNextPosition gets the grid, a tile ID and a direction as the input,
 * and calculates the ending position for that tile when moved in the direction.
 * It takes into account all the encountered tile types, like walls and sticky tiles.
 * @param grid
 * @param tileId
 * @param direction
 * @returns
 */
export const calculateNextPosition = (
	grid: Grid,
	tileId: string,
	direction: Direction
): NextPositionResult => {
	const tile = grid.tiles.find((b) => b.id === tileId);
	if (!tile) throw new Error('tile not found');

	const otherTiles = grid.tiles.filter((b) => b.id !== tileId);

	// keep track of current coordinates and velocity
	let x = tile.x;
	let y = tile.y;
	const vel = getVelocity(direction);

	let n = Math.max(grid.width, grid.height);
	while (n-- >= 0) {
		// increment the x and y pos by their velocities, and
		// also clamp them to the grid's size to prevent
		// the tile from going outside the grid
		x = clamp(x + vel.x, 0, grid.width - 1);
		y = clamp(y + vel.y, 0, grid.height - 1);

		// get all tiles at the current position
		const tilesAtPosition = otherTiles.filter((b) => b.x === x && b.y === y);

		const dirTile = tilesAtPosition.find((t) => getCollisionType(t) === 'direction');
		if (dirTile) {
			// in the next tick, move the same tile in the direction of the found tile
			return { x, y, nextTick: dirTile.direction };
		}

		const solidTile = tilesAtPosition.find((t) => getCollisionType(t) === 'solid');
		if (solidTile) {
			return { x: x - vel.x, y: y - vel.y };
		}

		const stickyTile = tilesAtPosition.find((t) => getCollisionType(t) === 'sticky');
		if (stickyTile) {
			return { x, y };
		}
	}

	return { x: x, y: y };
};

export const canMove = (t: Tile) => t.type === 'letter';

/**
 * Returns the tile's collision type.
 */
const getCollisionType = (t: Tile): CollisionType => {
	const types: Record<string, CollisionType> = {
		goal: 'none',
		sticky: 'sticky',
		wall: 'solid',
		letter: 'solid',
		direction: 'direction'
	};

	return types?.[t.type] ?? 'none';
};

/**
 * Returns the x and y axis velocities based on the direction
 * @param dir
 * @returns
 */
const getVelocity = (dir: Direction): Coordinates => {
	switch (dir) {
		case 'bottom':
			return { x: 0, y: 1 };
		case 'top':
			return { x: 0, y: -1 };
		case 'left':
			return { x: -1, y: 0 };
		case 'right':
			return { x: 1, y: 0 };
		default:
			return { x: 0, y: 0 };
	}
};
