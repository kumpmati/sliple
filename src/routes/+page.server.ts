import { connectDB, getLatestPuzzle } from '$lib/services/database';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ setHeaders }) => {
	await connectDB();

	const latest = await getLatestPuzzle();

	setHeaders({
		'Cache-Control': 'public, max-age=60' // cache for 1 min
	});

	return {
		latest
	};
};
