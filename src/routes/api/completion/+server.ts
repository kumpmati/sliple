import { z } from 'zod';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { createPuzzleCompletion } from '$lib/services/database';
import { nanoid } from 'nanoid';

const schema = z.object({
	puzzleId: z.string().min(1).max(64),
	type: z.literal('w').or(z.literal('l')),
	numMoves: z.number().int().min(1)
});

export const POST: RequestHandler = async ({ request }) => {
	const raw = await request.json();

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
