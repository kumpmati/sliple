import { savePuzzleForUser } from '$lib/services/puzzle';
import { puzzleSchema } from '$lib/types/puzzle';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
	type: z.literal('random').or(z.literal('featured')),
	puzzle: puzzleSchema
});

export const POST: RequestHandler = async ({ locals, request }) => {
	const session = await locals.auth.validate();
	if (!session) throw error(403, 'unauthorized');

	const body = await schema.spa(await request.json());

	if (!body.success) {
		throw error(400, 'malformed');
	}

	const result = await savePuzzleForUser({
		userId: session.userId,
		timestamp: new Date(),
		type: body.data.type,
		puzzleId: body.data.puzzle.id,
		url:
			body.data.type === 'random'
				? `/play/random/${body.data.puzzle.id}`
				: `/play/featured/${body.data.puzzle.id}`,
		description:
			body.data.type === 'random'
				? `Random: "${body.data.puzzle.data.solution}"`
				: `Featured: "${body.data.puzzle.data.solution}" in ${body.data.puzzle.data.maxMoves.bronze} moves`
	});

	return json(result);
};
