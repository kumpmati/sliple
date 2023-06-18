import lucia from 'lucia-auth';
import { sveltekit } from 'lucia-auth/middleware';
import adapter from '@lucia-auth/adapter-mongoose';
import mongoose from 'mongoose';
import { dev } from '$app/environment';
// import auth models here so that they are defined when auth is being initialized
import './models';

export const auth = lucia({
	adapter: adapter(mongoose),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	transformDatabaseUser: (raw) => ({
		id: raw.id,
		name: raw.name,
		image: raw.image
	})
});

export type Auth = typeof auth;

export type AuthUser = {
	id: string;
	name: string;
	image: string;
};
