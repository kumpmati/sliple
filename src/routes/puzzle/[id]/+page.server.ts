import { connectDB, getLatestPuzzle, getPuzzleById } from '$lib/services/database';
import { error, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad<{ id: string }> = async ({ params }) => {
	await connectDB();

	const id = params?.['id'];
	if (!id) throw error(404, 'not found');

	const puzzle = id === 'latest' ? await getLatestPuzzle() : await getPuzzleById(id);
	if (!puzzle) throw error(404, 'not found');

	return { puzzle };
};
