// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

/// <reference types="svelte-gestures" />

/// <reference types="lucia" />

import type { AuthRequest } from 'lucia-auth';

declare global {
	namespace Lucia {
		type Auth = import('$lib/services/auth').Auth;
		type UserAttributes = {
			name: string;
			image: string;
		};
	}

	declare namespace App {
		// interface Error {}
		interface Locals {
			auth: AuthRequest;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
