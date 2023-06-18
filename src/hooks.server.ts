import { connectDB } from '$lib/services/database';

// connect to database in here, so that every route doesn't have to do it manually.
await connectDB();
