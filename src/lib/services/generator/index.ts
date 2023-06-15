import type { GoalTile, LetterTile } from '$lib/types/grid';
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
	goalTiles: GoalTile[]
): LetterTile[] => {
	return generateUniqueTilePositions(word + 'letters', word.length, size, goalTiles).map(
		(pos, i) => ({
			...pos,
			type: 'letter',
			id: nanoid(),
			letter: word[i]
		})
	);
};

/**
 * Generates a pseudorandom puzzle based on a seed value and the given constraints
 * @param seed
 * @param constraints
 */
export const generatePuzzle = (seed: string, constraints: GeneratorConstraints): Puzzle => {
	const rnd = alea(seed);

	const { words, maxLength } = constraints;

	const validWords = words.filter((w) => (maxLength ? w.length < maxLength : true));

	const word = validWords[Math.floor(rnd.quick() * validWords.length)];

	const minSize = Math.sqrt(word.length) + 1;
	const width = mapToRange(rnd(), 0, 1, minSize, constraints.width?.max ?? minSize + 1);
	const height = mapToRange(rnd(), 0, 1, minSize, constraints.height?.max ?? minSize + 1);

	const goalTiles = generateGoalTiles(word, { width, height });
	const letterTiles = generateLetterTiles(word, { width, height }, []);

	return {
		id: seed,
		publishedAt: new Date(),
		version: 'generated.v1',
		data: {
			solution: word,
			width: Math.round(width),
			height: Math.round(height),
			numMovesTaken: 0,
			maxMoves: {
				bronze: 50,
				silver: 40,
				gold: 30
			},
			tiles: [...goalTiles, ...letterTiles]
		}
	};
};
