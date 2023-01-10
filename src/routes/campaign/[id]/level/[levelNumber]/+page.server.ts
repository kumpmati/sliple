import type { Campaign } from '$lib/types/campaign';
import { error, type Load } from '@sveltejs/kit';

export const load: Load<{ levelNumber: string }, any, { campaign: Campaign }> = async ({
	params,
	parent
}) => {
	const parentData = await parent();

	const num = parseInt(params.levelNumber);

	if (isNaN(num) || num < 1 || num > parentData.campaign.levels.length) {
		throw error(404, 'not found');
	}

	return {
		levelNumber: num
	};
};
