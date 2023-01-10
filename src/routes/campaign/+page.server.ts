import { connectDB, getAllCampaigns } from '$lib/services/database';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async () => {
	await connectDB();

	return {
		campaigns: await getAllCampaigns()
	};
};
