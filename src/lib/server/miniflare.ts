import { dev } from '$app/environment';
import type { Miniflare } from 'miniflare';

let mf: Miniflare;

/**
 * Returns the input platform if in production,
 * and returns a miniflare dev platform when in development mode.
 */
export const getPlatform = async (
	platform: Readonly<App.Platform> | undefined
): Promise<App.Platform> => {
	if (!dev) {
		if (!platform) throw new Error('platform not defined');
		return platform;
	}

	if (!mf) {
		const { Miniflare, Log, LogLevel } = await import('miniflare');

		mf = new Miniflare({
			log: new Log(LogLevel.INFO),
			kvPersist: './miniflare',
			kvNamespaces: ['KV'],
			script: '',
			modules: true
		});
	}

	return { env: await mf.getBindings() };
};
