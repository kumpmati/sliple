import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getAllSavedPuzzlesForUser } from '$lib/services/puzzle';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/auth/signin');

	return {
		savedPuzzles: getAllSavedPuzzlesForUser(session.userId)
	};
};
