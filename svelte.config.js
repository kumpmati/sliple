import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: preprocess({ globalStyle: true }),

	kit: {
		adapter: adapter(),
		version: {
			name: 'v2.1.8',
			pollInterval: 5 * 60 * 1000 // every 5 minutes
		},
		serviceWorker: {
			// disabled
			register: false
		}
	}
};

export default config;
