import type { GoalTile, LetterTile, Tile, WallTile } from '$lib/types/grid';
import type { Puzzle } from '$lib/types/puzzle';
import { mapToRange } from '$lib/utils/math';
import { nanoid } from 'nanoid';
import { alea } from 'seedrandom';
import { generateUniqueTilePositions } from './tiles';

type MinMaxConstraint = {
	min?: number;
	max?: number;
};

type GeneratorConstraints = {
	words: string[];
	maxLength?: number;
	width?: MinMaxConstraint;
	height?: MinMaxConstraint;
	moves?: {
		gold: number;
		silver: number;
		bronze: number;
	};
};

type PuzzleSize = {
	width: number;
	height: number;
};

const generateGoalTiles = (word: string, size: PuzzleSize): GoalTile[] => {
	return generateUniqueTilePositions(word + 'goal', word.length, size, []).map((pos, i) => ({
		...pos,
		type: 'goal',
		id: nanoid(),
		letter: word[i],
		index: i
	}));
};

const generateLetterTiles = (
	word: string,
	size: PuzzleSize,
	existingTiles: Tile[]
): LetterTile[] => {
	return generateUniqueTilePositions(word + 'letters', word.length, size, existingTiles).map(
		(pos, i) => ({
			...pos,
			type: 'letter',
			id: nanoid(),
			letter: word[i]
		})
	);
};

const generateWallTiles = (
	word: string,
	amount: number,
	size: PuzzleSize,
	tiles: Tile[]
): WallTile[] => {
	return generateUniqueTilePositions(word + 'wall', amount, size, tiles).map((pos) => ({
		...pos,
		type: 'wall',
		id: nanoid()
	}));
};

/**
 * Generates a pseudorandom puzzle based on a seed value and the given constraints.
 *
 * The publish date of the puzzle is the current time.
 */
export const generatePuzzle = (
	seed: string,
	id: string,
	constraints: GeneratorConstraints
): Puzzle => {
	const rnd = alea(seed);

	const { words, maxLength } = constraints;

	const validWords = words.filter((w) => (maxLength ? w.length < maxLength : true));

	const word = validWords[Math.floor(rnd.quick() * validWords.length)];

	const minSize = Math.sqrt(word.length) + 1;
	const width = mapToRange(rnd(), 0, 1, minSize, constraints.width?.max ?? minSize + 1);
	const height = mapToRange(rnd(), 0, 1, minSize, constraints.height?.max ?? minSize + 1);

	const goalTiles = generateGoalTiles(word, { width, height });

	const numWallTiles = rnd.quick() < 0.1 ? 1 : 0;
	// make sure wall tiles never overlap existing tiles
	const wallTiles = generateWallTiles(word, numWallTiles, { width, height }, goalTiles);

	const letterTiles = generateLetterTiles(word, { width, height }, [
		// makes sure not all letters are in the right place
		...goalTiles.slice(0, 2),
		// makes sure letters never overlap with walls
		...wallTiles
	]);

	return {
		id,
		publishedAt: new Date(),
		version: 'generated.v1',
		data: {
			solution: word,
			width: Math.round(width),
			height: Math.round(height),
			numMovesTaken: 0,
			maxMoves: constraints.moves ?? {
				bronze: 30,
				silver: 20,
				gold: 10
			},
			tiles: [...goalTiles, ...letterTiles, ...wallTiles]
		}
	};
};
