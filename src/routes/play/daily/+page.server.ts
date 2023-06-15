import { generatePuzzle } from '$lib/services/generator';
import dayjs from 'dayjs';
import words from '$lib/assets/words.json';
import { RANDOM_LEVEL_SALT } from '$env/static/private';
import { error } from '@sveltejs/kit';

export const load = async () => {
	// use current date + a secret value to determine the seed.
	// that way you can't easily generate the same level manually.
	const seed = dayjs().format('YYYY-MM-DD') + RANDOM_LEVEL_SALT;

	try {
		return {
			puzzle: generatePuzzle(seed, { words, maxLength: 7 })
		};
	} catch (err: any) {
		throw error(500, err?.message ?? 'unknown error');
	}
};
