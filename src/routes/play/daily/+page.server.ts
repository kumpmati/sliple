import dayjs from 'dayjs';
import words from '$lib/assets/words.json';
import { DAILY_LEVEL_SALT } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { generator } from '$lib/services/generator/strategies/backtrack';

export const load = async () => {
	const date = dayjs().format('YYYY-MM-DD');

	// use current date + a secret value to determine the seed.
	// that way you can't easily generate the same level manually.
	const seed = date + DAILY_LEVEL_SALT;

	try {
		const puzzle = generator.generate(seed, { words, maxLength: 7, minLength: 4 });
		puzzle.id = `daily-${date}`;

		return { puzzle };
	} catch (err: any) {
		throw error(500, err?.message ?? 'unknown error');
	}
};
