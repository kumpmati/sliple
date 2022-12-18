<script lang="ts">
	import { createGridStore } from '$lib/stores/grid';
	import type { Grid } from '$lib/types/grid';
	import { isGoalTile, isLetterTile } from '$lib/utils/typeguards';
	import { setContext } from 'svelte';
	import { swipe } from 'svelte-gestures';
	import GoalBlock from './GoalBlock.svelte';
	import LetterBlock from './LetterBlock.svelte';

	export let initialData: Grid;

	const store = createGridStore(initialData);
	setContext('grid', store);

	const handleSwipe = (e: CustomEvent) => {
		const dir = e.detail.direction;
		const id = e.detail.target.dataset?.['id'];

		if (!id) return;

		store.moveBlock(id, dir);
	};
</script>

<div
	class="grid"
	use:swipe={{ minSwipeDistance: 10, timeframe: 300, touchAction: 'none' }}
	on:swipe={handleSwipe}
>
	{#each $store.blocks as block (block.id)}
		{#if isLetterTile(block)}
			<LetterBlock {block} />
		{:else if isGoalTile(block)}
			<GoalBlock {block} />
		{/if}
	{/each}
</div>

<style lang="scss">
	.grid {
		position: relative;
		width: 32rem;
		height: 32rem;
		border: 3px solid rgba(0, 0, 0, 0.125);
		border-radius: 23px;
		display: flex;
		overflow: hidden;
		padding: 0.5rem;
	}
</style>
