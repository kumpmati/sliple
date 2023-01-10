import { gridSchema } from '$lib/types/grid';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import z from 'zod';
import { PuzzleModel } from '$lib/schemas/puzzle';
import { nanoid } from 'nanoid';
import { EDITOR_PASSWORD } from '$env/static/private';
import { connectDB } from '$lib/services/database';

const bodySchema = z.object({
	password: z.string(),
	level: gridSchema
});

export const POST: RequestHandler = async ({ request }) => {
	await connectDB();

	const unsafeBody = await request.json();
	const body = bodySchema.safeParse(unsafeBody);

	if (!body.success) {
		throw error(400, 'malformed');
	}

	if (!EDITOR_PASSWORD || body.data.password !== EDITOR_PASSWORD) {
		throw error(403, 'unauthorized');
	}

	const id = nanoid(15);

	await new PuzzleModel({
		id: id,
		data: body.data.level,
		publishedAt: new Date()
	}).save();

	return json({ id });
};
