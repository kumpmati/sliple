import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: preprocess({ globalStyle: true }),

	kit: {
		adapter: adapter(),
		version: {
			name: 'v1.9.1',
			pollInterval: 5 * 60 * 1000 // every 5 minutes
		},
		serviceWorker: {
			// only register in
			register: process.env.NODE_ENV === 'production'
		}
	}
};

export default config;
