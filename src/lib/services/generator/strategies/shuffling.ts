import type { Puzzle } from '$lib/types/puzzle';
import * as seedrandom from 'seedrandom';
import type { GeneratorConstraints, PuzzleGenerator } from '../interface';
import {
	generateGridSize,
	getRandomDirection,
	getRandomLetterTile,
	getRandomWord,
	isAgainsWall
} from '../utils';
import { generateUniqueTilePositions } from '../tiles';
import type { GoalTile, Grid, LetterTile, WallTile } from '$lib/types/grid';
import { createGridStore } from '$lib/stores/grid';
import { nanoid } from 'nanoid';
import { get } from 'svelte/store';
import { isLetterTile } from '$lib/utils/typeguards';

const MAX_ITERATIONS = 500;
const SHUFFLE_ITERATIONS = 200;

/**
 * Generates puzzles by placing down a bunch of letters and walls,
 * shuffling them around for a while, then placing goals where the
 * letters end up and moving the letters back to their starting
 * positions.
 */
class ShufflingGenerator implements PuzzleGenerator {
	public generate(seed: string, constraints: GeneratorConstraints): Puzzle {
		const rnd = seedrandom.xor4096(seed);

		const word = getRandomWord(rnd, constraints);
		const size = generateGridSize(rnd, word.length + 5, word.length * 4);

		// generate random starting positions for each letter in the word
		const startPositions = generateUniqueTilePositions(rnd, word.length, size);
		const startingLetters = startPositions.map(
			(pos, i) =>
				({
					...pos,
					id: nanoid(),
					type: 'letter',
					letter: word[i],
					index: i
				} satisfies LetterTile & { index: number })
		);

		const numWalls = rnd.double() < 0.1 ? 1 : 0;
		const wallPositions = generateUniqueTilePositions(rnd, numWalls, size, startPositions);
		const walls = wallPositions.map(
			(pos) => ({ id: nanoid(), type: 'wall', ...pos } satisfies WallTile)
		);

		const initialGrid: Grid = {
			...size,
			maxMoves: {
				bronze: MAX_ITERATIONS,
				silver: MAX_ITERATIONS,
				gold: MAX_ITERATIONS
			},
			numMovesTaken: 0,
			solution: word,
			tiles: [
				...startingLetters,
				...walls,

				// add a 'goal' tile that can't be reached, so that the game doesn't end.
				{ type: 'goal', id: '0', x: -1, y: -1, letter: 'PLACEHOLDER', index: 0 } satisfies GoalTile
			]
		};

		const store = createGridStore(initialGrid);

		let n = 0;
		while (n++ < SHUFFLE_ITERATIONS) {
			const tile = getRandomLetterTile(get(store), rnd);
			const dir = getRandomDirection(rnd);

			store.moveTile(tile.id, dir);
		}

		let _state = get(store);
		let lettersAgainstWall = _state.tiles.filter(
			(t) => isLetterTile(t) && isAgainsWall(_state, t.id)
		);

		// try to shuffle letters until max 2 are against the wall
		// or we hit the iteration limit
		while (lettersAgainstWall.length > 3 && n++ < MAX_ITERATIONS) {
			const tile = getRandomLetterTile({ tiles: lettersAgainstWall } as Grid, rnd);
			const dir = getRandomDirection(rnd);

			store.moveTile(tile.id, dir);

			_state = get(store);
			lettersAgainstWall = _state.tiles.filter(
				(t) => isLetterTile(t) && isAgainsWall(_state, t.id)
			);
		}

		// retrieve positions of all letters after shuffling
		const shuffledLetters = get(store).tiles.filter(isLetterTile);

		const goals = shuffledLetters.map((m) => {
			const lt = startingLetters.find((l) => l.id === m.id);
			if (!lt) throw new Error('letter disappeared while shuffling');

			return {
				id: nanoid(),
				type: 'goal',
				x: m.x,
				y: m.y,
				index: lt.index,
				letter: lt.letter
			} satisfies GoalTile;
		});

		return {
			id: seed,
			publishedAt: new Date(),
			version: 'shuffling.v1',
			data: {
				...get(store),
				numMovesTaken: 0,
				maxMoves: {
					bronze: 30,
					silver: 25,
					gold: 20
				},
				tiles: [...startingLetters, ...walls, ...goals]
			}
		};
	}
}

export const shufflingGenerator = new ShufflingGenerator();
