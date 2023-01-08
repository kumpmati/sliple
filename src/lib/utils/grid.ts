import type { Direction } from '$lib/stores/grid';
import type { Tile, Grid_v1, Coordinates, CollisionType } from '$lib/types/grid';
import { clamp } from './math';

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
	grid: Grid_v1,
	tileId: string,
	direction: Direction
): Coordinates => {
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

		if (tilesAtPosition.find((t) => getCollisionType(t) === 'solid')) {
			return { x: x - vel.x, y: y - vel.y };
		}

		if (tilesAtPosition.find((t) => getCollisionType(t) === 'sticky')) {
			return { x: x, y: y };
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
		letter: 'solid'
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
