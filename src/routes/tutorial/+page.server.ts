import type { Campaign } from '$lib/types/campaign';
import type { ServerLoad } from '@sveltejs/kit';

export const prerender = true;

export const load: ServerLoad = async ({ fetch }) => {
	const response = await fetch('/tutorial.json');

	return {
		tutorial: (await response.json()) as Campaign
	};
};
