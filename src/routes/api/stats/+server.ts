import { createPuzzleCompletion, getCompletionsByPuzzleId } from '$lib/services/database';
import { sum } from '$lib/utils/math';
import { error } from '@sveltejs/kit';
import { Caccu } from 'caccu';
import { nanoid } from 'nanoid';
import { RateLimiter } from 'sveltekit-rate-limiter/server';
import { endpoint, zod, type InferClient } from 'sveltekit-superactions';
import { z } from 'zod';

export type PuzzleStats = {
	numCompletions: number;
	numWins: number;
	minMoves: number | null;
	averageMoves: number | null;
};

const ratelimiter = new RateLimiter({
	IP: [60, 'm'], // 1 per second per IP address
	IPUA: [20, 'm'] // 20 per minute per IP address + user agent
});

const completionSchema = z.object({
	puzzleId: z.string().min(1).max(64),
	type: z.literal('w').or(z.literal('l')),
	numMoves: z.number().int().min(1)
});

const cache = new Caccu();

export const POST = endpoint({
	getStats: zod(z.string().min(1).max(64), async (e, id) => {
		if (await ratelimiter.isLimited(e)) error(429);

		const completions = await cache.getOrUpdate(
			id,
			async () => getCompletionsByPuzzleId(id),
			5 // cache for 5 seconds
		);

		return {
			numCompletions: completions.length,
			numWins: completions.filter((c) => c.type === 'w').length,
			minMoves: Math.min(...completions.map((c) => c.numMoves)),
			averageMoves: sum(completions.map((c) => c.numMoves)) / completions.length
		} satisfies PuzzleStats;
	}),

	markCompletion: zod(completionSchema, async (e, body) => {
		if (await ratelimiter.isLimited(e)) error(429);

		const item = {
			id: nanoid(21),
			type: body.type,
			numMoves: body.numMoves,
			puzzleId: body.puzzleId
		};

		await createPuzzleCompletion(item);

		return item;
	})
});

export type StatsEndpoint = typeof POST;
