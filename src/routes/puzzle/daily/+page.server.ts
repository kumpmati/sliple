import { generatePuzzle } from '$lib/services/generator';
import dayjs from 'dayjs';
import words from '$lib/assets/words.json';

export const load = async () => {
	const seed = dayjs().format('YYYY-MM-DD:ss:SSS');

	return {
		puzzle: generatePuzzle(seed, { words, maxLength: 7 })
	};
};
