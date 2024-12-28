import { db } from '$lib/server/db';
import { getPuzzleStatistics } from '$lib/server/db/handlers/stats';
import { puzzleCompletionTable } from '$lib/server/db/schema';
import { sum } from '$lib/utils/math';
import { error } from '@sveltejs/kit';
import { Caccu } from 'caccu';
import { eq } from 'drizzle-orm';
import { RateLimiter } from 'sveltekit-rate-limiter/server';
import { endpoint, zod } from 'sveltekit-superactions';
import { z } from 'zod';

export type PuzzleStats = {
	numCompletions: number;
	numWins: number;
	minMoves: number | null;
	averageMoves: number | null;
};

const submitRateLimiter = new RateLimiter({
	IPUA: [30, 'm'] // IP Address + User Agent
});

const statsRateLimiter = new RateLimiter({
	IPUA: [60, 'm'] // IP Address + User Agent
});

const completionSchema = z.object({
	puzzleId: z.string().min(1).max(64),
	type: z.literal('w').or(z.literal('l')),
	numMoves: z.number().int().min(1)
});

const cache = new Caccu();

export const POST = endpoint({
	getStats: zod(z.string().min(1).max(64), async (e, id) => {
		if (await statsRateLimiter.isLimited(e)) error(429);

		const completions = await cache.getOrUpdate(
			id,
			async () =>
				db.select().from(puzzleCompletionTable).where(eq(puzzleCompletionTable.puzzleId, id)),
			5 // cache for 5 seconds
		);

		return {
			numCompletions: completions.length,
			numWins: completions.filter((c) => c.type === 'w').length,
			minMoves: completions.length > 0 ? Math.min(...completions.map((c) => c.numMoves)) : null,
			averageMoves:
				completions.length > 0 ? sum(completions.map((c) => c.numMoves)) / completions.length : null
		} satisfies PuzzleStats;
	}),

	markCompletion: zod(completionSchema, async (e, body) => {
		if (await submitRateLimiter.isLimited(e)) {
			error(429, { message: 'you are being rate limited, try again later' });
		}

		const [item] = await db.insert(puzzleCompletionTable).values(body).returning();

		return item;
	}),

	getv2Stats: zod(z.object({ puzzleId: z.string().min(1).max(64) }), async (e, body) => {
		if (await statsRateLimiter.isLimited(e)) {
			error(429, { message: 'you are being rate limited, try again later' });
		}

		return getPuzzleStatistics(body.puzzleId);
	})
});

export type StatsEndpoint = typeof POST;
