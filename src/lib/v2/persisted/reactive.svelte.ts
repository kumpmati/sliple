import { onDestroy } from 'svelte';
import type { LocalStatsDatabase } from './db';
import type { CompletionEntry } from './types';

export class PuzzleStats {
	#db: LocalStatsDatabase;
	current = $state<CompletionEntry | null>();
	#id = $state<string | null>();

	constructor(db: LocalStatsDatabase, id: string) {
		this.current = null;
		this.#db = db;
		this.setId(id);

		const unsubscribe = this.#db.onUpdate(() => this.#refetch());
		onDestroy(unsubscribe);
	}

	setId(id: string) {
		this.#id = id;
		this.#refetch();
	}

	#refetch() {
		if (!this.#id) return;

		this.#db.getEntry(this.#id).then((data) => {
			this.current = data;
		});
	}
}
