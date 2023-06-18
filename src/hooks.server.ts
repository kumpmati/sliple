import { auth } from '$lib/services/auth';
import { connectDB } from '$lib/services/database';

export const handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	// connect to database in here, so that every route doesn't have to do it manually.
	await connectDB();

	return await resolve(event);
};
