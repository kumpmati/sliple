import { getAllCommunityPuzzles } from '$lib/services/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		'Cache-Control': `public, max-age=${60 * 5}` // cache for 5min
	});

	return {
		puzzles: await getAllCommunityPuzzles()
	};
};
