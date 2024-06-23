import type { ServerLoad } from '@sveltejs/kit';

export const prerender = true;

export const load: ServerLoad = async ({ fetch }) => {
	const response = await fetch('tutorial.json');
	return response.json();
};
