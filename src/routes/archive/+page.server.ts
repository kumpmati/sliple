import { getAllPuzzles } from '$lib/services/database';
import { error, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async () => {
	try {
		return {
			puzzles: await getAllPuzzles()
		};
	} catch (err) {
		throw error(500, JSON.stringify(err));
	}
};
