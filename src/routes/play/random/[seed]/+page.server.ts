import words from '$lib/assets/words.json';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { shufflingGenerator } from '$lib/services/generator/strategies/shuffling';
import { analyzePuzzle } from '$lib/services/generator/analyze';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const puzzle = shufflingGenerator.generate(params.seed, {
			words,
			maxLength: 7,
			minLength: 4
		});

		return {
			puzzle,
			analysis: analyzePuzzle(puzzle)
		};
	} catch (err: any) {
		error(500, err?.message ?? 'unknown error');
	}
};
