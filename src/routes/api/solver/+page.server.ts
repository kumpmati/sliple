import { dev } from '$app/environment';
import { getPuzzleSolution } from '$lib/server/db/handlers/solution';
import { generateDailyPuzzle } from '$lib/v2/generate';
import { error } from '@sveltejs/kit';

export const load = async ({ url }) => {
	if (!dev) error(501, 'not implemented');

	const date = new Date(url.searchParams.get('date') ?? new Date());
	const puzzle = generateDailyPuzzle(date);

	return {
		puzzle,
		solution: await getPuzzleSolution(puzzle.id)
	};
};
