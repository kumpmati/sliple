import { error } from '@sveltejs/kit';
import { analyzePuzzle } from '$lib/services/generator/analyze';
import { generateDailyPuzzle } from '$lib/v2/generate';

export const load = async (e) => {
	try {
		const puzzle = generateDailyPuzzle();

		return {
			puzzle,
			analysis: analyzePuzzle(puzzle),
			timezone: e.request?.cf?.timezone
		};
	} catch (err: any) {
		error(500, err?.message ?? 'unknown error');
	}
};
