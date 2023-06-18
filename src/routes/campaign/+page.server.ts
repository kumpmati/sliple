import { getAllCampaigns } from '$lib/services/database';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async () => {
	return {
		campaigns: await getAllCampaigns()
	};
};
