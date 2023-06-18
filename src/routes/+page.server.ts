import { getLatestPuzzle } from '$lib/services/database';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ setHeaders, locals }) => {
	const latest = await getLatestPuzzle();
	const { user } = await locals.auth.validateUser();

	setHeaders({
		'Cache-Control': 'public, max-age=300' // cache for 5 minutes
	});

	return {
		latest,
		user
	};
};
