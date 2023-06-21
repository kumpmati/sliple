import words from '$lib/assets/words.json';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { GeneratorConstraints } from '$lib/services/generator/interface';
import type { Puzzle } from '$lib/types/puzzle';
import { shufflingGenerator } from '$lib/services/generator/strategies/shuffling';
import { reversibleGenerator } from '$lib/services/generator/strategies/reversible';
import { randomGenerator } from '$lib/services/generator/strategies/legacy';

export const load: PageServerLoad = async ({ params, url }) => {
	const version = url.searchParams.get('v');

	const constraints: GeneratorConstraints = {
		words,
		maxLength: 7,
		minLength: 4
	};

	let puzzle: Puzzle;

	const start = performance.now();

	try {
		switch (version) {
			case '3':
			default: {
				puzzle = shufflingGenerator.generate(params.seed, constraints);
				break;
			}

			case '2': {
				puzzle = reversibleGenerator.generate(params.seed, constraints);
				break;
			}

			case '1': {
				puzzle = randomGenerator.generate(params.seed, constraints);
				break;
			}
		}

		const end = performance.now();

		console.log(end - start, 'ms');

		return { puzzle };
	} catch (err: any) {
		throw error(500, err?.message ?? 'unknown error');
	}
};
