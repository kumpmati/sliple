import { connectDB, getAllPuzzles } from '$lib/services/database';
import { error, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async () => {
	try {
		await connectDB();

		return {
			puzzles: await getAllPuzzles()
		};
	} catch (err) {
		throw error(500, JSON.stringify(err));
	}
};
