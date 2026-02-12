import type { RequestEvent } from '@sveltejs/kit';

export const getRequestCountry = (e: RequestEvent) => {
	return e.request.headers.get('CF-IPCountry') || 'XX';
};
