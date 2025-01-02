import { browser } from '$app/environment';
import { openDB, type IDBPDatabase } from 'idb';

export class IndexedDbLocalStats {
	#db: IDBPDatabase | null = null;

	constructor() {
		if (!browser) return;
		this.init();
	}

	async init() {
		this.#db = await openDB('sliple-stats', 1);
		this.#db.transaction();
	}

	async markComplete() {}
}
