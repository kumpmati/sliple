// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

/// <reference types="svelte-gestures" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/pwa-assets" />
/// <reference types="@cloudflare/workers-types/experimental" />
/// <reference types="unplugin-icons/types/svelte" />

declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	interface Platform {
		env: {
			KV: KVNamespace;
		};
	}
}
