import type { PuzzleStatus, UserState } from '$lib/types/user';
import { writable } from 'svelte-local-storage-store';
import type { Readable } from 'svelte/store';

export type UserStore = Readable<UserState> & {
	setPuzzleStatus: (id: string, status: PuzzleStatus) => void;
};

const createUserStore = (): UserStore => {
	const state = writable<UserState>('sliple-user', {
		id: '',
		puzzles: {}
	});

	const setPuzzleStatus = (id: string, status: PuzzleStatus) => {
		state.update((prev) => {
			prev.puzzles[id] = { id, status };
			return prev;
		});
	};

	return {
		subscribe: state.subscribe,
		setPuzzleStatus
	};
};

export const userStore = createUserStore();
