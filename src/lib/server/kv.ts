import { parse, stringify } from 'devalue';

export const cached = async <T>(
	platform: Readonly<App.Platform> | undefined,
	key: string,
	update: () => Promise<T> | T,
	ttl?: number
): Promise<T> => {
	if (!platform) return await update();

	const existing = await platform.env.KV.get(key, 'text');
	if (existing) {
		return parse(existing) as T;
	}

	const value = await update();

	await platform.env.KV.put(key, stringify(value), { expirationTtl: ttl });

	return value;
};
