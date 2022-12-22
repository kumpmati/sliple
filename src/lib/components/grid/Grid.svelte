<script lang="ts">
	import type { GridStore } from '$lib/stores/grid';
	import type { Tile } from '$lib/types/grid';
	import { isGoalTile, isLetterTile, isStickyTile, isWallTile } from '$lib/utils/typeguards';
	import { setContext } from 'svelte';
	import Goal from './Goal.svelte';
	import Letter from './Letter.svelte';
	import Wall from './Wall.svelte';
	import Sticky from './Sticky.svelte';

	export let grid: GridStore;

	setContext('grid', grid);

	// letters should be the last items to be drawn,
	// so that they are drawn on top of every other tile.
	const sortTiles = (a: Tile) => (a.type === 'letter' ? 1 : 0);
</script>

<svg
	viewBox="0 0 {$grid.width * 64} {$grid.height * 64}"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	{#each $grid.tiles.sort(sortTiles) as tile (tile.id)}
		{#if isLetterTile(tile)}
			<Letter {tile} />
		{:else if isGoalTile(tile)}
			<Goal {tile} />
		{:else if isWallTile(tile)}
			<Wall {tile} />
		{:else if isStickyTile(tile)}
			<Sticky {tile} />
		{/if}
	{/each}

	<rect
		x={-5.5}
		y={-5.5}
		width={$grid.width * 64 + 11}
		height={$grid.height * 64 + 11}
		rx="16.5"
		stroke="var(--black)"
		stroke-opacity="0.25"
		stroke-width="3"
	/>
</svg>

<style lang="scss">
	svg {
		overflow: visible;
		position: relative;
	}
</style>
