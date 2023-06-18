import { unsavePuzzleForUser } from '$lib/services/puzzle';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
	puzzleId: z.string()
});

export const POST: RequestHandler = async ({ locals, request }) => {
	const session = await locals.auth.validate();
	if (!session) throw error(403, 'unauthorized');

	const body = await schema.spa(await request.json());
	if (!body.success) throw error(400, 'malformed');

	const result = await unsavePuzzleForUser(session.userId, body.data.puzzleId);
	return json(result);
};
