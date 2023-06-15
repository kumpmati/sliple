import { generatePuzzle } from '$lib/services/generator';
import dayjs from 'dayjs';
import words from '$lib/assets/words.json';
import { DAILY_LEVEL_SALT } from '$env/static/private';
import { error } from '@sveltejs/kit';

export const load = async () => {
	const date = dayjs().format('YYYY-MM-DD');

	// use current date + a secret value to determine the seed.
	// that way you can't easily generate the same level manually.
	const seed = date + DAILY_LEVEL_SALT;

	try {
		return {
			puzzle: generatePuzzle(seed, date, { words, maxLength: 7, minLength: 3 })
		};
	} catch (err: any) {
		throw error(500, err?.message ?? 'unknown error');
	}
};
