import { connectDB, getAllPuzzles } from '$lib/services/database';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ setHeaders }) => {
	await connectDB();

	setHeaders({
		'Cache-Control': 'public, max-age=300' // cache for 5 minutes
	});

	return {
		puzzles: await getAllPuzzles()
	};
};
