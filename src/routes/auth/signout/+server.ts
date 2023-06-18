import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { auth } from '$lib/services/auth';

export const GET: RequestHandler = async ({ locals }) => {
	const { session } = await locals.auth.validateUser();
	if (!session) {
		throw error(401);
	}

	await auth.invalidateSession(session.sessionId);
	locals.auth.setSession(null);

	throw redirect(302, '/');
};
