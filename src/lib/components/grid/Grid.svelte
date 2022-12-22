<script lang="ts">
	import type { GridStore } from '$lib/stores/grid';
	import { isGoalTile, isLetterTile, isStickyTile, isWallTile } from '$lib/utils/typeguards';
	import { setContext } from 'svelte';
	import GoalTile from './GoalTile.svelte';
	import LetterTile from './LetterTile.svelte';
	import StickyTile from './StickyTile.svelte';
	import WallTile from './WallTile.svelte';

	export let grid: GridStore;

	setContext('grid', grid);
</script>

<div class="grid" style:padding-top="{($grid.height / $grid.width) * 100}%">
	{#each $grid.tiles as tile (tile.id)}
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
		width: 100%;
		border: 3px solid rgba(0, 0, 0, 0.125);
		border-radius: 18px;
		display: flex;
		overflow: hidden;
		padding: 0.5rem;
	}
</style>
