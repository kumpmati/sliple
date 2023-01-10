import type { UserState } from '$lib/types/user';

export const getFirstInProgressLevel = (levels: any[], user: UserState) => {
	if (levels.every((l) => user.puzzles[l.id]?.status === 'completed')) return 0;

	const first = levels.findIndex(
		(l) =>
			!user.puzzles[l.id] ||
			user.puzzles[l.id]?.status === 'inprogress' ||
			user.puzzles[l.id]?.status === 'none'
	);

	return Math.max(0, first);
};
