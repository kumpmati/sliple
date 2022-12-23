import { connectDB, getLatestPuzzle } from '$lib/services/database';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async () => {
	await connectDB();

	const latest = await getLatestPuzzle();

	return {
		latest
	};
};
