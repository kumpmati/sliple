import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

const config = {
	plugins: [
		sveltekit(),
		Icons({ compiler: 'svelte' }),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'Sliple',
				short_name: 'Sliple',
				start_url: '/',
				scope: '/',
				description: 'A slippery puzzle game',
				theme_color: '#020617',
				background_color: '#000',
				display: 'standalone',
				icons: [
					{
						src: '/favicon-512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: '/favicon-192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/favicon-128.png',
						sizes: '128x128',
						type: 'image/png'
					}
				]
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
