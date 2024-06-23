import { analyzePuzzle } from '$lib/services/generator/analyze';
import { fromShareCode } from '$lib/services/generator/serialize';
import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
	const puzzle = fromShareCode(params.code);
	return {
		puzzle,
		analysis: analyzePuzzle(puzzle)
	};
};
