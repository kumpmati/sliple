import type { Puzzle_v1, Puzzle_v2 } from '$lib/types/puzzle';
import { requireSchemaVersion } from '$lib/utils/migration';

const mustBeV1 = requireSchemaVersion(null);
const mustBeV2 = requireSchemaVersion('2');

/**
 * Transforms v1 puzzles to v2 puzzles
 */
export const addTieredScore = {
	up: (puzzle: Puzzle_v1): Puzzle_v2 => {
		mustBeV1(puzzle);

		const { mode, maxMoves, solutions, ...d } = puzzle.data;

		return {
			...puzzle,
			data: {
				...d,
				solution: puzzle.data.solutions[0],
				maxMoves: {
					gold: maxMoves,
					silver: null,
					bronze: null
				}
			},
			version: '2'
		};
	},

	down: (puzzle: Puzzle_v2): Puzzle_v1 => {
		mustBeV2(puzzle);

		const { version, ...p } = puzzle;
		const { solution, ...d } = puzzle.data;

		return {
			...p,
			data: {
				...d,
				solutions: [solution],
				mode: 'predefined',
				maxMoves: d.maxMoves.gold
			}
		};
	}
};
