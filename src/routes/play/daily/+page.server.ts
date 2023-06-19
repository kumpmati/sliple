import { generatePuzzle } from '$lib/services/generator';
import dayjs from 'dayjs';
import words from '$lib/assets/words.json';
import { DAILY_LEVEL_SALT } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { getPuzzleCompletion, getPuzzleTop5 } from '$lib/services/puzzle';

export const load = async () => {
	const date = dayjs().format('YYYY-MM-DD');
	const id = `daily-${date}`;

	// use current date + a secret value to determine the seed.
	// that way you can't easily generate the same level manually.
	const seed = date + DAILY_LEVEL_SALT;

	try {
		return {
			puzzle: generatePuzzle(seed, id, { words, maxLength: 7, minLength: 4 }),
			streamed: {
				stats: getPuzzleCompletion(id),
				top5: getPuzzleTop5(id)
			}
		};
	} catch (err: any) {
		throw error(500, err?.message ?? 'unknown error');
	}
};
