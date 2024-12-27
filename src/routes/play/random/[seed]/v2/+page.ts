import words from '$lib/assets/words.json';
import { error } from '@sveltejs/kit';
import { shufflingGenerator } from '$lib/services/generator/strategies/shuffling';
import { analyzePuzzle } from '$lib/services/generator/analyze';

export const ssr = false;

export const load = async ({ params }) => {
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
