import type { Grid, WallTile, LetterTile, StickyTile, GoalTile } from '$lib/types/grid';
import { nanoid } from 'nanoid';

/**
 * Parses the starting grid state from a string.
 *
 * Uses the following syntax:
 * Each part is split by a semicolon (;).
 * The first part is either a letter (A,B,C,D,...)
 * or a # followed by either W (wall), S (sticky), or G (goal).
 * Then the next part is always the coordinates in the format x,y.
 *
 * Example of a wall tile at (5,3): #W5,3
 * Example of the letter A at (1,1): A1,1
 * Example of a goal (required) at (10,10): #G!10,10
 */
export const parseGridFromString = (input: string): Grid => {
	const [gridSettings, ...tiles] = input.split(';').filter((p) => !!p);
	if (!tiles || tiles.length === 1) {
		throw new Error('at least one tile is required');
	}

	const state = parseGridSettings(gridSettings);

	for (const p of tiles) {
		state.tiles.push(parsePart(p));
	}

	return state;
};

const parseGridSettings = (part: string) => {
	if (!part.startsWith('v1')) throw new Error('version must be v1');

	const [, settings] = part.split(':');
	const [w, h, maxMoves] = settings.split(',');

	const state: Grid = {
		width: parseInt(w),
		height: parseInt(h),
		numMovesTaken: 0,
		maxMoves: parseInt(maxMoves),
		tiles: []
	};

	return state;
};

const parsePart = (part: string) => {
	try {
		const [name, args] = part.split(':');
		const [x, y, ...rest] = args.split(',');

		const numX = parseInt(x);
		const numY = parseInt(y);

		// Special tiles
		switch (name) {
			case '#W':
				return createWall(numX, numY);

			case '#S':
				return createSticky(numX, numY);

			case '#G':
				return createGoal(numX, numY, rest);

			default:
				return createLetter(numX, numY, name);
		}
	} catch (err) {
		throw new Error('invalid tile: ' + err);
	}
};

const createWall = (x: number, y: number): WallTile => ({
	id: nanoid(),
	type: 'wall',
	x,
	y
});

const createSticky = (x: number, y: number): StickyTile => ({
	id: nanoid(),
	type: 'sticky',
	x,
	y
});

const createLetter = (x: number, y: number, letter: string): LetterTile => ({
	id: nanoid(),
	type: 'letter',
	letter,
	x,
	y
});

const createGoal = (x: number, y: number, args: string[]): GoalTile => ({
	id: nanoid(),
	type: 'goal',
	letter: args[0] !== '-' ? args[0] : null,
	index: parseInt(args[1]) ?? 0,
	x,
	y
});
