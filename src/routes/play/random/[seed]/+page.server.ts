import words from '$lib/assets/words.json';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { generator } from '$lib/services/generator/v2';
import { generatePuzzle } from '$lib/services/generator';
import type { GeneratorConstraints } from '$lib/services/generator/interface';

export const load: PageServerLoad = async ({ params, url }) => {
	const version = url.searchParams.get('v') ?? '2';

	const constraints: GeneratorConstraints = {
		words,
		maxLength: 7,
		minLength: 4
	};

	try {
		switch (version) {
			case '2':
			default: {
				const puzzle = generator.generate(params.seed, constraints);
				return { puzzle };
			}

			case '1': {
				const puzzle = generatePuzzle(params.seed, params.seed, constraints);
				return { puzzle };
			}
		}
	} catch (err: any) {
		throw error(500, err?.message ?? 'unknown error');
	}
};
