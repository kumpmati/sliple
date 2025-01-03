import { getContext, onDestroy, setContext } from 'svelte';
import type { CompletionEntry } from './types';
import { LocalStatsDatabase } from './db';

const key = Symbol('local-db');

export const initLocalDbContext = () => {
	return setContext(key, new LocalStatsDatabase());
};

export const getLocalDbContext = () => getContext<LocalStatsDatabase>(key);

export class PuzzleStats {
	#db: LocalStatsDatabase;
	current = $state<CompletionEntry | null>();

	constructor(db: LocalStatsDatabase, id: string) {
		this.current = null;
		this.#db = db;
		this.setId(id);

		const unsubscribe = this.#db.onUpdate(() => {
			this.setId(id);
			console.log('updating stats');
		});
		onDestroy(unsubscribe);
	}

	setId(id: string) {
		this.#db.getEntry(id).then((data) => (this.current = data));
	}
}
