import { error } from '@sveltejs/kit';
import { analyzePuzzle } from '$lib/services/generator/analyze';
import { dailyLevelId, generateDailyPuzzle } from '$lib/v2/generate';
import { getLocalDate } from '$lib/v2/timezone.js';
import { clearUidCookie, setOrUpdateCookie } from '$lib/v2/cookies.js';
import { hasCookieConsent } from '$lib/v2/cookies/cookie.js';
import { cached } from '$lib/server/kv.js';
import { getPlatform } from '$lib/server/miniflare.js';

export const load = async ({ params, cookies, platform: _platform }) => {
	if (hasCookieConsent(cookies)) {
		setOrUpdateCookie(cookies);
	} else {
		clearUidCookie(cookies);
	}

	try {
		const platform = await getPlatform(_platform);

		const date = new Date(params.date);

		const puzzle = await cached(
			platform,
			dailyLevelId(date),
			() => generateDailyPuzzle(date),
			60 * 60 * 48 // 48 hours
		);

		return {
			puzzle,
			analysis: analyzePuzzle(puzzle)
		};
	} catch (err: any) {
		error(500, err?.message ?? 'unknown error');
	}
};
