import { generatePuzzle } from '$lib/services/generator';
import words from '$lib/assets/words.json';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getSavedPuzzleForUser } from '$lib/services/puzzle';

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await locals.auth.validate();

	try {
		return {
			puzzle: generatePuzzle(params.seed, params.seed, { words, maxLength: 7, minLength: 4 }),
			saved: session ? getSavedPuzzleForUser(session.userId, params.seed) : null
		};
	} catch (err: any) {
		throw error(500, err?.message ?? 'unknown error');
	}
};
