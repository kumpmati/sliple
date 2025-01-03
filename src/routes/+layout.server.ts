import { error } from '@sveltejs/kit';
import { analyzePuzzle } from '$lib/services/generator/analyze';
import { generateDailyPuzzle } from '$lib/v2/generate';
import { getLocalDate } from '$lib/v2/timezone.js';

export const load = async (e) => {
	try {
		const puzzle = generateDailyPuzzle(getLocalDate(e.request));

		return {
			puzzle,
			analysis: analyzePuzzle(puzzle)
		};
	} catch (err: any) {
		error(500, err?.message ?? 'unknown error');
	}
};
