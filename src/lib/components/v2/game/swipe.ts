import type { SwipePointerEventDetail } from 'svelte-gestures';

export const handleSwipeEvent = (e: CustomEvent<SwipePointerEventDetail>) => {
	const tileId = (e.detail.target as Element | null)
		?.closest('[data-tile-id]')
		?.getAttribute('data-tile-id');

	return { tileId, direction: e.detail.direction };
};
