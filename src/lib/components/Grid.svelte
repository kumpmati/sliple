<script lang="ts">
	import type { GridStore } from '$lib/stores/grid';
	import { isGoalTile, isLetterTile, isStickyTile, isWallTile } from '$lib/utils/typeguards';
	import { createEventDispatcher, setContext } from 'svelte';
	import { swipe } from 'svelte-gestures';
	import GoalTile from './GoalTile.svelte';
	import LetterTile from './LetterTile.svelte';
	import StickyTile from './StickyTile.svelte';
	import WallTile from './WallTile.svelte';

	export let store: GridStore;

	setContext('grid', store);
	const dispatch = createEventDispatcher();

	const handleSwipe = (e: CustomEvent) => {
		const dir = e.detail.direction;
		const id = e.detail.target.dataset?.['id'];
		if (!id) return;

		store.moveTile(id, dir);
		dispatch('move', { id, dir });
	};
</script>

<div
	class="grid"
	use:swipe={{ minSwipeDistance: 50, timeframe: 300, touchAction: 'none' }}
	on:swipe={handleSwipe}
>
	{#each $store.tiles as tile (tile.id)}
		{#if isLetterTile(tile)}
			<LetterTile {tile} />
		{:else if isGoalTile(tile)}
			<GoalTile {tile} />
		{:else if isStickyTile(tile)}
			<StickyTile {tile} />
		{:else if isWallTile(tile)}
			<WallTile {tile} />
		{/if}
	{/each}
</div>

<style lang="scss">
	.grid {
		position: relative;
		width: 32rem;
		height: 32rem;
		border: 3px solid rgba(0, 0, 0, 0.125);
		border-radius: 18px;
		display: flex;
		overflow: hidden;
		padding: 0.5rem;
	}
</style>
