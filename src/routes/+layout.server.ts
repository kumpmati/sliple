import { error } from '@sveltejs/kit';
import { analyzePuzzle } from '$lib/services/generator/analyze';
import { generateDailyPuzzle } from '$lib/v2/generate';
import { getLocalDate } from '$lib/v2/timezone.js';
import { clearUidCookie, setOrUpdateCookie } from '$lib/v2/cookies.js';
import { hasCookieConsent } from '$lib/v2/cookies/cookie.js';

export const load = async ({ request, cookies }) => {
	if (hasCookieConsent(cookies)) {
		setOrUpdateCookie(cookies);
	} else {
		clearUidCookie(cookies);
	}

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
