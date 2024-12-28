import { browser } from '$app/environment';

export class LocalStore<T> {
	current = $state<T>() as T;
	key = '';

	constructor(key: string, value: T) {
		this.key = key;
		this.current = value;

		if (browser) {
			const item = localStorage.getItem(key);
			if (item) this.current = this.deserialize(item);
		}

		$effect(() => {
			localStorage.setItem(this.key, this.serialize(this.current));
		});
	}

	serialize(value: T): string {
		return JSON.stringify(value);
	}

	deserialize(item: string): T {
		return JSON.parse(item);
	}
}
