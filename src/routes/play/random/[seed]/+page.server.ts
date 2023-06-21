import words from '$lib/assets/words.json';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { shufflingGenerator } from '$lib/services/generator/strategies/shuffling';

export const load: PageServerLoad = async ({ params }) => {
	try {
		return {
			puzzle: shufflingGenerator.generate(params.seed, {
				words,
				maxLength: 7,
				minLength: 4
			})
		};
	} catch (err: any) {
		throw error(500, err?.message ?? 'unknown error');
	}
};
