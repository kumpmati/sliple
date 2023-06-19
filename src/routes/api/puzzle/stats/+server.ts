import { getPuzzleById } from '$lib/services/database';
import { addPuzzleCompletion, getPuzzleCompletion } from '$lib/services/puzzle';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

const postSchema = z.object({
	puzzleId: z.string(),
	moves: z.number().min(1),
	result: z.literal('w').or(z.literal('l'))
});

/**
 * Adds a new entry into the puzzle's statistics.
 */
export const POST: RequestHandler = async ({ locals, request }) => {
	const session = await locals.auth.validate();

	const body = await postSchema.spa(await request.json());

	if (!body.success) {
		throw error(400, 'malformed');
	}

	const result = await addPuzzleCompletion(body.data.puzzleId, {
		userId: session?.userId ?? null,
		moves: body.data.moves,
		result: body.data.result,
		timestamp: Date.now()
	});

	return json(result);
};

/**
 * Returns the completion statistics of a puzzle,
 * or null if it hasn't been completed yet.
 *
 * @throws if the puzzle doesn't exist
 */
export const GET: RequestHandler = async ({ url }) => {
	const puzzleId = url.searchParams.get('id');
	if (!puzzleId) throw error(400, 'missing puzzle id');

	const puzzle = await getPuzzleById(puzzleId);
	if (!puzzle) throw error(404, 'puzzle not found');

	const stats = await getPuzzleCompletion(puzzleId);

	return json({ stats });
};
