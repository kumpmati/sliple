import { dev } from '$app/environment';
import { insertPuzzleSolution } from '$lib/server/db/handlers/solution';
import { PuzzleSolver } from '$lib/services/solver/index.js';
import { generateDailyPuzzle } from '$lib/v2/generate';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ url }) => {
	if (!dev) error(501, 'not implemented');

	const dateParam = url.searchParams.get('date');
	const date = new Date(dateParam ?? new Date());

	const puzzle = generateDailyPuzzle(date);
	const solver = new PuzzleSolver(puzzle);

	console.log('constructing graph...');
	const { duration } = await solver.constructGraph();
	console.log('graph constructed, took', Math.round(duration / 1000), 'seconds');

	console.log('finding optimal route...');
	const optimum = solver.findOptimumRoute();
	console.log('optimal route found:', optimum.moves, 'moves');

	console.log('inserting solution into database...');
	const inserted = await insertPuzzleSolution({
		puzzleId: puzzle.id,
		calculationTimeMs: Math.round(duration),
		optimalSolution: optimum.moves
	});

	console.log('solution inserted');

	return json(inserted);
};
