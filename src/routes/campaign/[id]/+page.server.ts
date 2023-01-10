import { connectDB, getCampaignById } from '$lib/services/database';
import { error, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad<{ id: string }> = async ({ params }) => {
	await connectDB();

	const campaign = await getCampaignById(params.id);

	if (!campaign) {
		throw error(404, 'not found');
	}

	return {
		campaign
	};
};
