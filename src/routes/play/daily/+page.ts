import dayjs from 'dayjs';
import words from '$lib/assets/words.json';
import { PUBLIC_DAILY_LEVEL_SALT } from '$env/static/public';
import { error } from '@sveltejs/kit';
import { shufflingGenerator } from '$lib/services/generator/strategies/shuffling';
import { analyzePuzzle } from '$lib/services/generator/analyze';

export const ssr = false;

export const load = async () => {
	const date = dayjs().format('YYYY-MM-DD');
	const seed = date + PUBLIC_DAILY_LEVEL_SALT;

	try {
		const puzzle = shufflingGenerator.generate(seed, { words, maxLength: 7, minLength: 6 });
		puzzle.id = `daily-${date}`;

		return {
			puzzle,
			analysis: analyzePuzzle(puzzle)
		};
	} catch (err: any) {
		error(500, err?.message ?? 'unknown error');
	}
};
