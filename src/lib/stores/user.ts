import type { CompletionRank, CompletionStatus, UserState } from '$lib/types/user';
import { isHigherRank } from '$lib/utils/grid';
import { writable } from 'svelte-local-storage-store';
import type { Readable } from 'svelte/store';

export type UserStore = Readable<UserState> & {
	markPuzzleInProgress: (id: string) => void;
	markPuzzleComplete: (id: string, status: CompletionStatus, rank: CompletionRank | null) => void;
	deletePuzzleProgress: (id: string) => void;
};

const createUserStore = (): UserStore => {
	const state = writable<UserState>('sliple-user', {
		id: '',
		puzzles: {}
	});

	const markPuzzleComplete = (
		id: string,
		status: CompletionStatus,
		rank: CompletionRank | null,
		campaignId?: string
	) => {
		state.update((prev) => {
			prev.puzzles[id] = {
				id,
				campaignId,
				status,
				// keep the higher rank of the two, so that you can't go down a rank
				rank: isHigherRank(rank, prev.puzzles[id]?.rank) ? rank : prev.puzzles[id].rank
			};

			return prev;
		});
	};

	const markPuzzleInProgress = (id: string) => {
		state.update((prev) => {
			if (prev?.puzzles?.[id]?.status === 'completed') return prev;

			prev.puzzles[id] = {
				id,
				status: 'inprogress',
				rank: null
			};

			return prev;
		});
	};

	const deletePuzzleProgress = (id: string) => {
		state.update((prev) => {
			delete prev.puzzles[id];
			return prev;
		});
	};

	return {
		subscribe: state.subscribe,
		markPuzzleComplete,
		markPuzzleInProgress,
		deletePuzzleProgress
	};
};

export const userStore = createUserStore();
