import { error, json } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';
import type { RequestHandler } from './$types';
import { getCompletionsByPuzzleId } from '$lib/services/database';
import { sum } from '$lib/utils/math';
import { Caccu } from 'caccu';

export type PuzzleStats = {
	numCompletions: number;
	numWins: number;
	minMoves: number | null;
	averageMoves: number | null;
};

const cache = new Caccu();

const ratelimiter = new RateLimiter({
	IP: [60, 'm'], // 1 per second per IP address
	IPUA: [20, 'm'] // 20 per minute per IP address + user agent
});

export const GET: RequestHandler = async (e) => {
	if (await ratelimiter.isLimited(e)) error(429);

	const completions = await cache.getOrUpdate(
		e.params.id,
		async () => getCompletionsByPuzzleId(e.params.id),
		5 // cache for 5 seconds
	);

	return json({
		numCompletions: completions.length,
		numWins: completions.filter((c) => c.type === 'w').length,
		minMoves: Math.min(...completions.map((c) => c.numMoves)),
		averageMoves: sum(completions.map((c) => c.numMoves)) / completions.length
	} satisfies PuzzleStats);
};
