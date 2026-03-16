import { describe, it } from 'vitest';
import { PuzzleSolver } from '.';
import { shufflingGenerator } from '../generator/strategies/shuffling';
import words from '$lib/assets/words.json';

describe('solver', () => {
	it(
		'works',
		async () => {
			const puzzle = shufflingGenerator.generate('e', {
				words,
				maxLength: 7,
				minLength: 4
			});

			const solver = new PuzzleSolver(puzzle);
			const { duration } = await solver.constructGraph();
			console.log('took', (duration / 1000).toFixed(1), 's to construct graph');

			console.time('opt');
			const opt = solver.findOptimumRoute();
			console.timeEnd('opt');
			console.log('optimum:', opt);
		},
		// 1 hour timeout
		{ timeout: 60 * 60 * 1000 }
	);
});
