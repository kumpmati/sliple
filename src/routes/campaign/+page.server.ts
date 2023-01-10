import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ fetch }) => {
	const campaign1 = await fetch('campaign-1.json');
	const campaign2 = await fetch('campaign-2.json');
	const campaign3 = await fetch('campaign-3.json');

	return {
		campaigns: [await campaign1.json(), await campaign2.json(), await campaign3.json()]
	};
};
