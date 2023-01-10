import { connectDB, getCampaignById } from '$lib/services/database';
import { error, type ServerLoad } from '@sveltejs/kit';

/**
 * Campaign is loaded in the layout to prevent any extra loads of the same data
 * when changing levels, or otherwise navigating between campaign pages.
 */
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
