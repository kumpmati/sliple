import { getContext, setContext } from 'svelte';
import { LocalStore } from '../persisted.svelte';

type LocalStats = {
	hideTutorial?: boolean;
	daily: Record<string, { best: LocalCompletion | null; latest: LocalCompletion | null } | null>;
	random: Record<string, { best: LocalCompletion | null; latest: LocalCompletion | null } | null>;
};

export type LocalCompletion = {
	puzzleId: string;
	type: 'daily' | 'random';
	moves: number;
	win: boolean;
	timestamp: string;
};

const key = Symbol('user-stats');

export const initLocalStatsContext = () =>
	setContext(key, new LocalStore<LocalStats>('sliple-stats', { daily: {}, random: {} }));

export const getLocalStatsContext = () => getContext<LocalStore<LocalStats>>(key);

export const markCompleted = (s: LocalStore<LocalStats>, c: LocalCompletion) => {
	s.current[c.type] ??= {};

	const existing = s.current[c.type]?.[c.puzzleId];

	if (!existing) {
		s.current[c.type][c.puzzleId] = { best: c.win ? c : null, latest: c };
		return;
	}

	existing.latest = c;

	if (!existing.best || (c.moves <= existing.best.moves && c.win)) {
		existing.best = c;
	}
};
