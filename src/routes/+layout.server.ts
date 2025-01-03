import { error } from '@sveltejs/kit';
import { analyzePuzzle } from '$lib/services/generator/analyze';
import { generateDailyPuzzle } from '$lib/v2/generate';
import { getLocalDate } from '$lib/v2/timezone.js';
import { getUidCookie, createUidCookie } from '$lib/v2/cookies.js';

export const load = async ({ request, cookies }) => {
	const uid = getUidCookie(cookies);
	if (!uid) createUidCookie(cookies);

	try {
		const puzzle = generateDailyPuzzle(getLocalDate(request));

		return {
			puzzle,
			analysis: analyzePuzzle(puzzle)
		};
	} catch (err: any) {
		error(500, err?.message ?? 'unknown error');
	}
};
