import { analyzePuzzle } from '$lib/services/generator/analyze';
import { fromShareCode } from '$lib/services/generator/serialize';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
	try {
		const puzzle = fromShareCode(params.code);

		return {
			puzzle,
			analysis: analyzePuzzle(puzzle)
		};
	} catch (err) {
		error(500, (err as Error)?.message ?? 'unknown error');
	}
};
