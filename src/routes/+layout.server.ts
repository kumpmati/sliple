import { error } from '@sveltejs/kit';
import { analyzePuzzle } from '$lib/services/generator/analyze';
import { generateDailyPuzzle } from '$lib/v2/generate';
import { getTimeZone } from '$lib/v2/timezone.js';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export const load = async (e) => {
	try {
		const tz = getTimeZone(e.request);
		const localDate = dayjs().tz(tz).toDate();

		const puzzle = generateDailyPuzzle(localDate);

		return {
			puzzle,
			analysis: analyzePuzzle(puzzle),
			dates: [localDate, dayjs().toDate()]
		};
	} catch (err: any) {
		error(500, err?.message ?? 'unknown error');
	}
};
