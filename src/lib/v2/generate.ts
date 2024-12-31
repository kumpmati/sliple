import dayjs from 'dayjs';
import words from '$lib/assets/words.json';
import { PUBLIC_DAILY_LEVEL_SALT } from '$env/static/public';
import { shufflingGenerator } from '$lib/services/generator/strategies/shuffling';
import { Caccu } from 'caccu';
import type { Puzzle } from '$lib/types/puzzle';

// puzzle generation is expensive (15-30ms cpu time) but should
// be deterministic based on the seed so we can cache the result.
const levelCache = new Caccu();

export const generateDailyPuzzle = (dateOverride?: Date) => {
	const date = dayjs(dateOverride).format('YYYY-MM-DD');
	const seed = date + PUBLIC_DAILY_LEVEL_SALT;

	const id = `daily-${date}`;

	const cached = levelCache.get<Puzzle>(id);
	if (cached) return cached;

	const puzzle = shufflingGenerator.generate(seed, { words, minLength: 6, maxLength: 7 });
	puzzle.id = id;

	return levelCache.set(id, puzzle, 60 * 60 * 24); // cache for 1 day
};
