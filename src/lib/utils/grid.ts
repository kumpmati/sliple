import { createGridStore, Dir, type GridState } from '$lib/stores/grid';
import type { Tile, Grid, Coordinates, CollisionType } from '$lib/types/grid';
import type { Puzzle } from '$lib/types/puzzle';
import { get } from 'svelte/store';
import { copy } from './copy';
import { clamp } from './math';
import { isGoalTile, isLetterTile } from './typeguards';

type CompletionRank = 'gold' | 'silver' | 'bronze';

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
	nextTick?: Dir;
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
	grid: Pick<Grid, 'tiles' | 'width' | 'height'>,
	tileId: string,
	direction: Dir
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

		const solidTile = tilesAtPosition.find((t) => getCollisionType(t) === 'solid');
		if (solidTile) {
			return { x: x - vel.x, y: y - vel.y };
		}

		const dirTile = tilesAtPosition.find((t) => getCollisionType(t) === 'direction');
		if (dirTile) {
			// in the next tick, move the same tile in the direction of the found tile
			return { x, y, nextTick: dirTile.direction };
		}

		const stickyTile = tilesAtPosition.find((t) => getCollisionType(t) === 'sticky');
		if (stickyTile) {
			return { x, y };
		}
	}

	return { x: x, y: y };
};

export const canMove = (t: Tile) => isLetterTile(t);

/**
 * Returns the tile's collision type.
 */
export const getCollisionType = (t: Tile): CollisionType => {
	switch (t.type) {
		case 'goal':
		case 'g':
			return 'none';

		case 'sticky':
		case 's':
			return 'sticky';

		case 'wall':
		case 'w':
			return 'solid';

		case 'letter':
		case 'l':
			return 'solid';

		case 'direction':
		case 'd':
			return 'direction';

		default:
			return 'none';
	}
};

/**
 * Returns the x and y axis velocities based on the direction
 * @param dir
 * @returns
 */
const getVelocity = (dir: Dir): Coordinates => {
	switch (dir) {
		case Dir.DOWN:
			return { x: 0, y: 1 };
		case Dir.UP:
			return { x: 0, y: -1 };
		case Dir.LEFT:
			return { x: -1, y: 0 };
		case Dir.RIGHT:
			return { x: 1, y: 0 };
		default:
			return { x: 0, y: 0 };
	}
};

/**
 * Given a puzzle state, returns all moves that result in a different state.
 *
 * @param from state from which to calculate possible moves
 */
export const getAllPossibleMoves = (from: Grid): { id: string; dir: Dir; state: Grid }[] => {
	const moves: Record<string, { id: string; dir: Dir; state: Grid }> = {};

	for (const tile of from.tiles) {
		if (!isLetterTile(tile)) continue;

		for (const dir of Object.values(Dir)) {
			const key = `${tile.id} ${dir}`;

			const nextPos = calculateNextPosition(from, tile.id, dir);
			if (nextPos.x === tile.x && nextPos.y === tile.y) continue; // did not move

			// make copy so we can include the changed state in the move itself
			const copied = copy(from);

			const cTile = copied.tiles.find((t) => t.id === tile.id);
			if (cTile) {
				cTile.x = nextPos.x;
				cTile.y = nextPos.y;
			}

			moves[key] = { id: tile.id, dir, state: copied };
		}
	}

	return Object.values(moves);
};

/**
 * Returns a number that uniquely represents one possible state of the puzzle.
 * Two states produce equal hashes if both have all their letter tiles in the same positions.
 */
export const hashState = (grid: Grid): number => {
	const sortedTiles = grid.tiles.filter(isLetterTile).toSorted((a, b) => a.id.localeCompare(b.id));
	return cyrb53(sortedTiles.map((s) => `${s.letter} ${s.x} ${s.y}`).join(';'));
};

const cyrb53 = (str: string, seed = 0) => {
	let h1 = 0xdeadbeef ^ seed,
		h2 = 0x41c6ce57 ^ seed;
	for (let i = 0, ch; i < str.length; i++) {
		ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}
	h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
	h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
	h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
	h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

	return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export const drawPuzzleAsString = (p: Pick<Puzzle, 'data'>): string => {
	const str: string[] = [];

	for (let y = 0; y < p.data.height; y++) {
		str.push('');

		for (let x = 0; x < p.data.width; x++) {
			const letter = p.data.tiles.find((t) => t.x === x && t.y === y && isLetterTile(t));
			const goal = p.data.tiles.find((t) => t.x === x && t.y === y && isGoalTile(t));

			if (letter) {
				str[y] += letter.letter?.toUpperCase();
			} else if (goal) {
				str[y] += goal.letter?.toLowerCase();
			} else {
				str[y] += '-';
			}
		}
	}

	return str.join('\n');
};
