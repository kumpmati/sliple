import { Dir } from '$lib/stores/grid';
import type { SwipePointerEventDetail } from 'svelte-gestures';

export const handleSwipeEvent = (e: CustomEvent<SwipePointerEventDetail>) => {
	const tileId = (e.detail.target as Element | null)
		?.closest('[data-tile-id]')
		?.getAttribute('data-tile-id');

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
