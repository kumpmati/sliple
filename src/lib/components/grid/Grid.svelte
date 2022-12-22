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
	const sortTiles = (a: Tile) => (a.type === 'letter' ? 1 : -1);
</script>

<svg
	width="100%"
	viewBox="0 0 {$grid.width * 68} {$grid.height * 68}"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	style:max-width="{$grid.width * 68}px"
	style:max-height="{$grid.height * 68}px"
>
	<rect
		x={-5.5}
		y={-5.5}
		width={$grid.width * 68 + 11}
		height={$grid.height * 68 + 11}
		rx="16.5"
		fill="var(--white)"
		stroke="var(--black)"
		stroke-opacity="0.25"
		stroke-width="2"
	/>

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
</svg>

<style lang="scss">
	svg {
		overflow: visible;
		position: relative;
	}
</style>
