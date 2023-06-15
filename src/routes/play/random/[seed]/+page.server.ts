import { generatePuzzle } from '$lib/services/generator';
import words from '$lib/assets/words.json';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	try {
		return {
			puzzle: generatePuzzle(params.seed, params.seed, { words, maxLength: 8, minLength: 3 })
		};
	} catch (err: any) {
		throw error(500, err?.message ?? 'unknown error');
	}
};
