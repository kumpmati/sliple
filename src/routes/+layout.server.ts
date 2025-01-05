import { error } from '@sveltejs/kit';
import { analyzePuzzle } from '$lib/services/generator/analyze';
import { dailyLevelId, generateDailyPuzzle } from '$lib/v2/generate';
import { getLocalDate } from '$lib/v2/timezone.js';
import { clearUidCookie, setOrUpdateCookie } from '$lib/v2/cookies.js';
import { hasCookieConsent } from '$lib/v2/cookies/cookie.js';
import { cached } from '$lib/server/kv.js';
import { getPlatform } from '$lib/server/miniflare.js';

export const load = async ({ request, cookies, platform: _platform }) => {
	if (hasCookieConsent(cookies)) {
		setOrUpdateCookie(cookies);
	} else {
		clearUidCookie(cookies);
	}

	try {
		const platform = await getPlatform(_platform);

		const localDate = getLocalDate(request);

		const puzzle = await cached(
			platform,
			dailyLevelId(localDate),
			() => generateDailyPuzzle(new Date(localDate)),
			60 * 60 * 1 // 1 hour
		);

		return {
			puzzle,
			analysis: analyzePuzzle(puzzle)
		};
	} catch (err: any) {
		error(500, err?.message ?? 'unknown error');
	}
};
