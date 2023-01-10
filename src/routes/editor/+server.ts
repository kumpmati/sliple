import { gridSchema } from '$lib/types/grid';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import z from 'zod';
import { PuzzleModel } from '$lib/schemas/puzzle';
import { nanoid } from 'nanoid';
import { EDITOR_PASSWORD } from '$env/static/private';
import { connectDB, getCampaignById, updateCampaign } from '$lib/services/database';

const bodySchema = z.object({
	password: z.string(),
	campaignId: z.string().nullable(),
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

	// generate id for the level
	const id = nanoid(15);

	// if campaign is specified, add level to campaign instead.
	const campaignId = body.data.campaignId;
	if (campaignId) {
		const campaign = await getCampaignById(campaignId);
		if (!campaign) throw error(404, 'campaign not found');

		campaign.levels.push({
			id: id,
			data: body.data.level,
			message: null,
			difficulty: campaign.difficulty
		});

		await updateCampaign(campaignId, campaign);
		return json({ id, campaignId });
	}

	await new PuzzleModel({
		id: id,
		data: body.data.level,
		publishedAt: new Date()
	}).save();

	return json({ id });
};
