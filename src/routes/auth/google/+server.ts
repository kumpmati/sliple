import { googleAuth } from '$lib/services/auth/google';
import type { RequestHandler } from './$types';

/**
 * Redirects the user to the Google OAuth sign in page.
 */
export const GET: RequestHandler = async ({ cookies }) => {
	const [url, state] = await googleAuth.getAuthorizationUrl();

	cookies.set('google_oauth_state', state, {
		path: '/',
		maxAge: 60 * 60
	});

	return new Response(null, {
		status: 302,
		headers: {
			location: url.toString()
		}
	});
};
