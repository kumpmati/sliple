import { getAllPuzzles } from '$lib/services/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		'Cache-Control': `public, max-age=${60 * 60 * 24}` // cache for 24h
	});

	return {
		puzzles: await getAllPuzzles()
	};
};
