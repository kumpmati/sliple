import { auth } from '$lib/services/auth';
import { googleAuth } from '$lib/services/auth/google';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Handles the Google OAuth callback.
 *
 * Either returns the existing user or creates a new one.
 *
 * @see https://lucia-auth.com/oauth/start-here/getting-started?sveltekit#authenticate-user
 */
export const GET: RequestHandler = async ({ cookies, url, locals }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	const storedState = cookies.get('google_oauth_state');

	if (!code || !state || !storedState || state !== storedState) {
		throw error(401);
	}

	try {
		const { existingUser, createUser, providerUser } = await googleAuth.validateCallback(code);

		const getUser = async () => {
			if (existingUser) return existingUser;

			return await createUser({ name: providerUser.name, image: providerUser.picture });
		};

		const user = await getUser();
		const session = await auth.createSession(user.id);
		locals.auth.setSession(session);
	} catch (err) {
		throw error(500, err as any);
	}

	throw redirect(302, '/');
};
