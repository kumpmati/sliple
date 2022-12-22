import { getAllPuzzles } from '$lib/services/database';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async () => {
	const puzzles = await getAllPuzzles();

	return {
		puzzles
	};
};
