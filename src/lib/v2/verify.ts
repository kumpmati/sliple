import type { Puzzle } from '$lib/types/puzzle';
import { type HistoryItem } from './game/state.svelte';
import { copy } from '$lib/utils/copy';
import { moveTile } from './game/game';
import { isWinStatus } from './game/utils';

export const verifyPuzzleWin = (
	p: Puzzle,
	moves: Pick<HistoryItem, 'tileId' | 'dir'>[]
): { moves: number; error: string | null } => {
	let tiles = copy(p.data.tiles);
	let n = 0;

	moves.forEach((move) => {
		const result = moveTile(p.data, tiles, move.tileId, move.dir);
		if (result) {
			tiles = result;
			n++;
		}
	});

	// some moves were not valid
	if (n !== moves.length) {
		return { moves: 0, error: `expected ${moves.length} moves, got ${n}` };
	}

	if (!isWinStatus) {
		return { moves: 0, error: 'could not verify a win using the given moves' };
	}

	return { moves: n, error: null };
};
