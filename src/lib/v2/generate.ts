import dayjs from 'dayjs';
import words from '$lib/assets/words.json';
import { PUBLIC_DAILY_LEVEL_SALT } from '$env/static/public';
import { shufflingGenerator } from '$lib/services/generator/strategies/shuffling';

export const generateDailyPuzzle = (dateOverride?: Date) => {
	const date = dayjs(dateOverride).format('YYYY-MM-DD');
	const seed = date + PUBLIC_DAILY_LEVEL_SALT;

	const puzzle = shufflingGenerator.generate(seed, { words, minLength: 6, maxLength: 7 });
	puzzle.id = `daily-${date}`;

	return puzzle;
};
