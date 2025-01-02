import { Dir } from '$lib/stores/grid';
import type { SwipePointerEventDetail } from 'svelte-gestures';

export const getPuzzleId = (el?: Element) =>
	el?.closest?.('[data-puzzle-id]')?.getAttribute('data-puzzle-id') ?? null;

export const getTileId = (el?: Element) =>
	el?.closest?.('[data-tile-id]')?.getAttribute('data-tile-id') ?? null;

export const handleSwipeEvent = (e: CustomEvent<SwipePointerEventDetail>) => {
	const tileId = getTileId(e.detail.target as Element);

	return { tileId, direction: getDirFromDirection(e.detail.direction) };
};

const getDirFromDirection = (d: 'top' | 'bottom' | 'left' | 'right' | null) => {
	switch (d) {
		default:
			return null;
		case 'top':
			return Dir.UP;
		case 'bottom':
			return Dir.DOWN;
		case 'left':
			return Dir.LEFT;
		case 'right':
			return Dir.RIGHT;
	}
};
