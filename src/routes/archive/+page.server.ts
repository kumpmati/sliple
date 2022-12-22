import { connectDB, getAllPuzzles } from '$lib/services/database';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async () => {
	await connectDB();

	return {
		puzzles: await getAllPuzzles()
	};
};
