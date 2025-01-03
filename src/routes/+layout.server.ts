import { error } from '@sveltejs/kit';
import { analyzePuzzle } from '$lib/services/generator/analyze';
import { generateDailyPuzzle } from '$lib/v2/generate';
import { getLocalDate } from '$lib/v2/timezone.js';
import { getUidCookie, setUidCookie } from '$lib/v2/cookies.js';
import { nanoid } from 'nanoid';

export const load = async ({ request, cookies }) => {
	// generate uid cookie if not already existing, otherwise update expiry time
	setUidCookie(cookies, getUidCookie(cookies) ?? nanoid());

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
