import { getLatestPuzzle, getPuzzleById } from '$lib/services/database';
import { analyzePuzzle } from '$lib/services/generator/analyze';
import { error, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad<{ id: string }> = async ({ params, setHeaders }) => {
	const id = params?.['id'];
	if (!id) throw error(404, 'not found');

	const puzzle = id === 'latest' ? await getLatestPuzzle() : await getPuzzleById(id);
	if (!puzzle) throw error(404, 'not found');

	setHeaders({
		'Cache-Control': 'public, max-age=300' // cache for 5 minutes
	});

	return {
		puzzle,
		analysis: analyzePuzzle(puzzle)
	};
};
