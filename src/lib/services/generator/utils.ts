import { mapToRange } from '$lib/utils/math';
import type seedrandom from 'seedrandom';
import type { TilePos } from './tiles';
import type { GoalTile, Grid, LetterTile } from '$lib/types/grid';
import { nanoid } from 'nanoid';
import { createGridStore, type Direction, type GridStore } from '$lib/stores/grid';
import { get } from 'svelte/store';
import { copy } from '$lib/utils/copy';
import { isGoalTile, isLetterTile } from '$lib/utils/typeguards';
import type { GeneratorConstraints } from './interface';

/**
 * Given a direction, this returns the opposite direction
 * @param d
 * @returns
 */
export const getOppositeDir = (d: Direction): Direction => {
	switch (d) {
		case 'left':
			return 'right';
		case 'right':
			return 'left';
		case 'top':
			return 'bottom';
		case 'bottom':
			return 'top';
	}
};

export const filterWordsByLength = (words: string[], min: number, max: number) =>
	words.filter((w) => w.length <= (max ?? 99) && w.length >= (min ?? 0));

/**
 * Returns a random word that fits within the given constraints.
 */
export const getRandomWord = (rnd: seedrandom.PRNG, constraints: GeneratorConstraints): string => {
	const eligibleWords = filterWordsByLength(
		constraints.words,
		constraints.minLength ?? 0,
		constraints.maxLength ?? 99
	);

	return eligibleWords[Math.floor(rnd.double() * eligibleWords.length)];
};

/**
 * Generates a random grid size between the min and max area
 * @param rnd Random number generator
 * @returns
 */
export const generateGridSize = (rnd: seedrandom.PRNG, minArea: number, maxArea: number) => {
	const minSideLength = Math.sqrt(minArea);
	const maxSideLength = Math.sqrt(maxArea);

	// initial guess
	let width = Math.round(mapToRange(rnd.double(), 0, 1, minSideLength, maxSideLength));
	let height = Math.round(mapToRange(rnd.double(), 0, 1, minSideLength, maxSideLength));

	// expand randomly if smaller than specified min
	while (width * height < minArea) {
		if (rnd.double() > 0.5) {
			width++;
		} else {
			height++;
		}
	}

	// shrink randomly if bigger than specified max
	while (width * height > maxArea) {
		if (rnd.double() > 0.5) {
			width--;
		} else {
			height--;
		}
	}

	return { width, height };
};

/**
 * Given a word and an equal amount of tile positions, maps each position to a letter
 * in the word
 *
 * @param word
 * @param positions
 * @returns
 */
export const mapPositionsToGoalTiles = (word: string, positions: TilePos[]) => {
	if (positions.length !== word.length) throw new Error('length mismatch');

	return positions.map(
		(pos, index) =>
			({
				...pos,
				index,
				letter: word[index],
				type: 'goal',
				id: nanoid()
			} satisfies GoalTile)
	);
};

/**
 * Returns a random direction
 *
 * @param rnd Random number generator
 */
export const getRandomDirection = (rnd: seedrandom.PRNG): Direction =>
	(['top', 'bottom', 'left', 'right'] as const)[Math.floor(rnd.double() * 4)];

/**
 * Returns a random letter tile from the given grid.
 *
 * @param grid
 * @param rnd Random number generator
 * @returns
 */
export const getRandomLetterTile = (grid: Grid, rnd: seedrandom.PRNG): LetterTile => {
	const letters = grid.tiles.filter((t) => isLetterTile(t)) as LetterTile[];
	return letters[Math.floor(rnd.double() * letters.length)];
};

/**
 * Returns an array of all the letter tiles that are immediately above
 * their corresponding goal tile
 *
 * @param grid
 */
export const getAllImmediatelyCorrectTiles = (grid: Grid): LetterTile[] => {
	const letters = grid.tiles.filter((l) => isLetterTile(l)) as LetterTile[];

	return letters.filter((l) =>
		grid.tiles.find((g) => isGoalTile(g) && g.letter === l.letter && g.x === l.x && g.y === l.y)
	) as LetterTile[];
};

/**
 * Given a grid store, letter tile ID and a direction,
 * checks if applying the direction to the tile results
 * in the same outcome if done in reverse.
 * Returns false also if the tile didn't move at all during
 * the initial move
 *
 * NOTE: doesn't work with boosters currently, as they use a timeout
 *
 * @param store
 * @param id
 * @param dir
 */
const isReversibleDirection = (state: Grid, id: string, dir: Direction): boolean => {
	const store = createGridStore(state);

	const stateBefore = get(store).tiles.find((t) => t.id === id);
	if (!stateBefore) throw new Error('tile not found');

	store.moveTile(id, dir);

	const stateDuring = get(store).tiles.find((t) => t.id === id);
	if (!stateDuring) throw new Error('tile not found during move');

	store.moveTile(id, getOppositeDir(dir));

	const stateAfter = get(store).tiles.find((t) => t.id === id);
	if (!stateAfter) throw new Error('tile not found after move');

	return (
		// make sure the tile actually moved during the initial move
		(stateBefore.x !== stateDuring.x || stateBefore.y !== stateDuring.y) &&
		// make sure that the tile resets back to its original position
		stateBefore.x === stateAfter.x &&
		stateBefore.y === stateAfter.y
	);
};

/**
 * Returns a random direction for the given tile that results in the same result
 * if applied in reverse.
 * @param store
 * @param id
 * @param rnd
 */
export const getRandomReversibleDirection = (
	store: GridStore,
	id: string,
	rnd: seedrandom.PRNG
): Direction | null => {
	const state = copy(get(store));

	const directions = new Set<Direction>();

	if (isReversibleDirection(state, id, 'left')) directions.add('left');
	if (isReversibleDirection(state, id, 'right')) directions.add('right');
	if (isReversibleDirection(state, id, 'top')) directions.add('top');
	if (isReversibleDirection(state, id, 'bottom')) directions.add('bottom');

	const arr = [...directions];

	// return a random direction from the possible outcomes, or null if no valid direction is found
	return arr.length > 0 ? arr[Math.floor(rnd.double() * arr.length)] : null;
};

/**
 * Returns true if the given tile is directly against a wall
 * @param grid
 * @param id
 */
export const isAgainsWall = (grid: Grid, id: string): boolean => {
	const tile = grid.tiles.find((t) => t.id === id);
	if (!tile) {
		return false;
	}

	if (tile.x === 0) return true;
	if (tile.x === grid.width - 1) return true;
	if (tile.y === 0) return true;
	if (tile.y === grid.height - 1) return true;

	return false;
};
