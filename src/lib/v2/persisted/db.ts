import { openDB, type IDBPDatabase } from 'idb';
import { EndType, PuzzleType, type CompletionDetails, type CompletionEntry } from './types';
import type { Puzzle } from '$lib/types/puzzle';

// increment this and update the 'upgrade' function
// when making changes to the database structure.
const DB_VERSION = 1;

export class LocalStatsDatabase {
	#db: IDBPDatabase | null = null;
	#subscribers: (() => void)[];

	constructor() {
		this.#subscribers = [];
		this.init();
	}

	async init() {
		if (this.#db || typeof window === 'undefined' || !('indexedDB' in window)) {
			return; // prevent indexedDB from loading on the server
		}

		this.#db = await openDB('sliple-stats', DB_VERSION, {
			upgrade(database) {
				if (!database.objectStoreNames.contains('puzzle')) {
					const store = database.createObjectStore('puzzle', {
						keyPath: 'puzzleId',
						autoIncrement: false
					});

					store.createIndex('puzzleId', 'puzzleId', { unique: true });
					store.createIndex('timestamp', 'timestamp', { unique: true });
					store.createIndex('puzzleType', 'puzzleType', { unique: false });
				}

				// TODO: handle migrations here
				// https://www.mozzlog.com/blog/indexeddb-migration-using-idb
			}
		});
	}

	async markPuzzleComplete(puzzle: Puzzle, moves: number, endType: EndType, dateOverride?: Date) {
		if (!this.#db) await this.init();

		const details: CompletionDetails = {
			endType,
			moves,
			timestamp: dateOverride ?? new Date()
		};

		let existing = await this.getEntry(puzzle.id);

		if (!existing) {
			existing = {
				puzzleId: puzzle.id,
				puzzleType: puzzle.id.startsWith('daily') ? PuzzleType.DAILY : PuzzleType.RANDOM,
				puzzle,
				timestamp: details.timestamp,
				best: null,
				latest: details
			};
		}

		if ((!existing.best || moves < existing.best.moves) && endType === EndType.WIN) {
			existing.best = details;
		}

		existing.latest = details;

		await this.#db?.put('puzzle', existing);
		this.#emitUpdate();
	}

	async getEntry(puzzleId: string): Promise<CompletionEntry | null> {
		if (!this.#db) await this.init();

		return (await this.#db?.getFromIndex('puzzle', 'puzzleId', puzzleId)) ?? null;
	}

	async getAllDaily(): Promise<CompletionEntry[]> {
		if (!this.#db) await this.init();
		return (await this.#db?.getAllFromIndex('puzzle', 'puzzleType', PuzzleType.DAILY)) ?? [];
	}

	async getAllRandom(): Promise<CompletionEntry[]> {
		if (!this.#db) await this.init();
		return (await this.#db?.getAllFromIndex('puzzle', 'puzzleType', PuzzleType.RANDOM)) ?? [];
	}

	onUpdate(cb: () => void) {
		this.#subscribers.push(cb);
		return () => this.offUpdate(cb);
	}

	offUpdate(cb: () => void) {
		this.#subscribers.splice(this.#subscribers.indexOf(cb, 1));
	}

	async clear() {
		if (!this.#db) await this.init();
		return this.#db?.clear('puzzle');
	}

	#emitUpdate() {
		this.#subscribers.forEach((cb) => cb());
	}
}
