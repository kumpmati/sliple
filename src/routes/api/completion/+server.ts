import { z } from 'zod';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';
import { db } from '$lib/server/db';
import { puzzleCompletionTable } from '$lib/server/db/schema';

const ratelimiter = new RateLimiter({
	IP: [60, 'm'], // 1 per second per IP address
	IPUA: [20, 'm'] // 20 per minute per IP address + user agent
});

const schema = z.object({
	puzzleId: z.string().min(1).max(64),
	type: z.literal('w').or(z.literal('l')),
	numMoves: z.number().int().min(1)
});

export const POST: RequestHandler = async (e) => {
	if (await ratelimiter.isLimited(e)) error(429);

	const result = schema.safeParse(await e.request.json());
	if (!result.success) {
		error(400, 'invalid schema');
	}

	const [item] = await db
		.insert(puzzleCompletionTable)
		.values({
			type: result.data.type,
			numMoves: result.data.numMoves,
			puzzleId: result.data.puzzleId
		})
		.returning();

	return json(item);
};
