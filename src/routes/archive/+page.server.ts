import { connectDB, getAllPuzzles } from '$lib/services/database';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ setHeaders }) => {
	await connectDB();

	setHeaders({
		'Cache-Control': 'public, max-age=3600' // cache for 1 hour
	});

	return {
		puzzles: await getAllPuzzles()
	};
};
