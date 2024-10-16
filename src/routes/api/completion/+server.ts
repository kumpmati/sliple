import { z } from 'zod';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { createPuzzleCompletion } from '$lib/services/database';
import { nanoid } from 'nanoid';
import { RateLimiter } from 'sveltekit-rate-limiter/server';

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

	const raw = await e.request.json();

	const result = schema.safeParse(raw);
	if (!result.success) {
		error(400, 'invalid schema');
	}

	const item = {
		id: nanoid(21),
		type: result.data.type,
		numMoves: result.data.numMoves,
		puzzleId: result.data.puzzleId
	};

	await createPuzzleCompletion(item);

	return json(item);
};
