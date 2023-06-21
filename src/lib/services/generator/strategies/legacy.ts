import type { GoalTile, LetterTile, Tile, WallTile } from '$lib/types/grid';
import type { Puzzle } from '$lib/types/puzzle';
import { mapToRange } from '$lib/utils/math';
import { nanoid } from 'nanoid';
import seedrandom, { alea } from 'seedrandom';
import { generateUniqueTilePositions } from '../tiles';
import type { PuzzleGenerator } from '../interface';

type MinMaxConstraint = {
	min?: number;
	max?: number;
};

type GeneratorConstraints = {
	words: string[];
	maxLength?: number;
	minLength?: number;
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
	const rnd = alea(word + 'goal');

	return generateUniqueTilePositions(rnd, word.length, size, []).map((pos, i) => ({
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
	const rnd = alea(word + 'letters');

	return generateUniqueTilePositions(rnd, word.length, size, existingTiles).map((pos, i) => ({
		...pos,
		type: 'letter',
		id: nanoid(),
		letter: word[i]
	}));
};

const generateWallTiles = (
	word: string,
	amount: number,
	size: PuzzleSize,
	tiles: Tile[]
): WallTile[] => {
	const rnd = alea(word + 'wall');
	return generateUniqueTilePositions(rnd, amount, size, tiles).map((pos) => ({
		...pos,
		type: 'wall',
		id: nanoid()
	}));
};

/**
 * Generates a pseudorandom puzzle based on a seed value and the given constraints.
 * Randomly places a bunch of letters, goals and walls, disregarding if it's possible
 * to slide the letters to their goals.
 *
 * This is the original algorithm used to generate random puzzles.
 */
export const generatePuzzle = (
	seed: string,
	id: string,
	constraints: GeneratorConstraints
): Puzzle => {
	const rnd = seedrandom.alea(seed);

	const { words, maxLength, minLength } = constraints;

	const validWords = words.filter((w) => {
		if (maxLength && w.length > maxLength) return false;
		if (minLength && w.length < minLength) return false;
		return true;
	});

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
				silver: 30,
				gold: 30
			},
			tiles: [...goalTiles, ...letterTiles, ...wallTiles]
		}
	};
};

export const randomGenerator: PuzzleGenerator = {
	generate: (seed, constraints) => generatePuzzle(seed, seed, constraints)
};
