import { sleep } from './sleep';

export class Queue<T> {
	#items: { key: number; item: T }[];
	#itemKeys: Set<number>;

	constructor() {
		this.#items = [];
		this.#itemKeys = new Set();
	}

	clear() {
		this.#items = [];
		this.#itemKeys.clear();
	}

	insert(key: number, item: T) {
		if (this.#itemKeys.has(key)) return;
		this.#items.push({ key, item });
	}

	async process(cb: (key: number, item: T, index: number) => void) {
		for (let i = 0; i < this.#items.length; i++) {
			if (i % 10_000 === 0) {
				const progress = Math.round((i / this.#items.length) * 100);
				console.log(i, '/', this.#items.length, `(${progress}%)`);
				await sleep(1); // sleep so that console log can be flushed
			}

			cb(this.#items[i].key, this.#items[i].item, i);

			// delete the item from the queue after processing, so that it may be freed by gc
			this.#items[i] = null as any;
		}
	}
}
