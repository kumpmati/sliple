import { writable } from 'svelte/store';

/**
 * Creates a store that
 * @param url
 * @param method
 * @param initialState
 * @returns
 */
export const requestable = <T>(url: string, method: 'GET' | 'POST' = 'GET', initialState?: T) => {
	const state = writable<T | null>(initialState);
	const loading = writable(false);
	const error = writable<string | null>(null);

	const request = async <D, R = any>(data: D): Promise<R | null> => {
		loading.set(true);
		error.set(null);

		try {
			return await fetch(url, {
				method,
				body: method === 'POST' ? JSON.stringify(data) : null
			})
				.then((d) => d.json())
				.then((d) => {
					state.set(d);
					return d;
				});
		} catch (err: any) {
			state.set(null);
			error.set(String(err));
			return null;
		} finally {
			loading.set(false);
		}
	};

	return { data: state, loading, error, request };
};
