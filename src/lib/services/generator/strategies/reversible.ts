import type { Puzzle } from '$lib/types/puzzle';
import type { GeneratorConstraints, PuzzleGenerator } from '../interface';
import { generateUniqueTilePositions } from '../tiles';
import seedrandom from 'seedrandom';
import {
	filterWordsByLength,
	generateGridSize,
	getAllImmediatelyCorrectTiles,
	getRandomReversibleDirection,
	mapPositionsToGoalTiles,
	getOppositeDir,
	getRandomLetterTile
} from '../utils';
import type { Grid, LetterTile, WallTile } from '$lib/types/grid';
import { nanoid } from 'nanoid';
import { createGridStore } from '$lib/stores/grid';
import { get } from 'svelte/store';
import { Caccu } from 'caccu';

/**
 * When the generator attempts to shuffle immediately
 * correct tiles, how much of the used moves to include
 * in the required moves of the puzzle
 */
const UNSOLVE_ITERATION_MULTIPLIER = 1;

const GOLD_MULTIPLIER = 0.9;
const SILVER_MULTIPLIER = 1.25;
const BRONZE_MULTIPLIER = 1.5;

const MAX_TOTAL_ITERATIONS = 1000;
const MAX_UNSHUFFLE_IMMEDIATES_ITERATIONS = 100;

/**
 * Generates levels by placing random goals, placing letters
 * onto them then shuffling the letters around in a way that
 * is always reversible.
 */
class ReversibleGenerator implements PuzzleGenerator {
	private cache: Caccu;

	constructor() {
		this.cache = new Caccu();
	}

	/**
	 * Generates the
	 * @param seed
	 * @param constraints
	 * @returns
	 */
	public generate(seed: string, constraints: GeneratorConstraints): Puzzle {
		const { words: _, ...rest } = constraints;

		const key = seed + JSON.stringify(rest);

		return (
			this.cache.get(key) ?? this.cache.set(key, this.generateUncached(seed, constraints), 1 * 60)
		);
	}

	/**
	 * Generates a puzzle by randomly distributing a bunch of goals and walls,
	 * then filling the goals with letters and shuffling the letters around.
	 * @param seed
	 * @param constraints
	 * @returns
	 */
	private generateUncached(seed: string, constraints: GeneratorConstraints): Puzzle {
		const rnd = seedrandom.xor4096(seed);

		const eligibleWords = filterWordsByLength(
			constraints.words,
			constraints.minLength ?? 0,
			constraints.maxLength ?? 99
		);

		const word = eligibleWords[Math.floor(rnd.double() * eligibleWords.length)];
		const size = generateGridSize(rnd, word.length * 1.5, word.length * 4);

		const goals = mapPositionsToGoalTiles(
			word,
			generateUniqueTilePositions(rnd, word.length, size)
		);

		// 20% chance of including a wall in the puzzle
		const walls =
			rnd.double() < 0.2
				? generateUniqueTilePositions(rnd, 1, size, goals).map(
						(t) => ({ ...t, id: nanoid(), type: 'wall' }) satisfies WallTile
					)
				: [];

		const letters = goals.map(
			(g) =>
				({ x: g.x, y: g.y, letter: g.letter, id: nanoid(), type: 'letter' }) satisfies LetterTile
		);

		const initialGrid: Grid = {
			...size,
			tiles: [...goals, ...walls, ...letters],
			numMovesTaken: 0,
			maxMoves: {
				bronze: 0,
				silver: 0,
				gold: 0
			},
			solution: word
		};

		const { grid } = this.shuffleLetters(initialGrid, rnd, 15);

		return {
			id: seed,
			publishedAt: new Date(),
			version: 'generated.v2',
			data: grid
		};
	}

	/**
	 * Given a grid that contains letters and possible obstacles, this will shuffle the tiles around.
	 * This reuses the grid store, so that movement here and in game is always consistent
	 * @param grid
	 */
	private shuffleLetters(
		grid: Grid,
		rnd: seedrandom.PRNG,
		iterations = 15
	): { grid: Grid; solution: any[] } {
		let totalIterations = 0;

		const store = createGridStore(grid);

		const letters = get(store).tiles.filter((t) => t.type === 'letter') as LetterTile[];

		// Move all letters in a random direction where,
		// if reversed, it results in the same outcome
		let n = 0;
		while (n < iterations && totalIterations++ < MAX_TOTAL_ITERATIONS) {
			const randomLetterTile = letters[Math.floor(rnd.double() * letters.length)];
			const dir = getRandomReversibleDirection(store, randomLetterTile.id, rnd);

			if (dir) {
				n++;
				store.moveTile(randomLetterTile.id, dir);
			}
		}

		let immediatelyCorrect = getAllImmediatelyCorrectTiles(get(store));

		// shuffle the letters around until a maximum of 2 of the
		// letters are immediately correct, keeping track
		// of how many iterations it took.
		let n2 = 0;

		while (
			immediatelyCorrect.length > 1 &&
			n2 <= MAX_UNSHUFFLE_IMMEDIATES_ITERATIONS &&
			totalIterations++ < MAX_TOTAL_ITERATIONS
		) {
			const tile = getRandomLetterTile(get(store).tiles, rnd);

			const dir = getRandomReversibleDirection(store, tile.id, rnd);
			if (dir) {
				n2++;
				store.moveTile(tile.id, dir);
			}

			immediatelyCorrect = getAllImmediatelyCorrectTiles(get(store));
		}

		console.log({ n, n2, totalIterations });

		const state = get(store);

		return {
			grid: {
				...state,
				numMovesTaken: 0,
				maxMoves: {
					bronze: Math.round(
						state.numMovesTaken * BRONZE_MULTIPLIER - n2 * UNSOLVE_ITERATION_MULTIPLIER
					),
					silver: Math.round(
						state.numMovesTaken * SILVER_MULTIPLIER - n2 * UNSOLVE_ITERATION_MULTIPLIER
					),
					gold: Math.round(
						state.numMovesTaken * GOLD_MULTIPLIER - n2 * UNSOLVE_ITERATION_MULTIPLIER
					)
				}
			},
			solution: store
				.getMoveHistory()
				.reverse()
				.map((item) => ({ ...item, dir: getOppositeDir(item.dir) }))
		};
	}
}

export const reversibleGenerator = new ReversibleGenerator();
