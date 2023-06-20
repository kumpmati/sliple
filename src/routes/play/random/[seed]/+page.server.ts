import words from '$lib/assets/words.json';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { generator } from '$lib/services/generator/v2';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const puzzle = generator.generate(params.seed, { words, maxLength: 7, minLength: 4 });
		return { puzzle };
	} catch (err: any) {
		throw error(500, err?.message ?? 'unknown error');
	}
};
