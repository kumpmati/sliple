<script lang="ts">
	import type { GridStore } from '$lib/stores/grid';
	import type { Tile } from '$lib/types/grid';
	import { isGoalTile, isLetterTile, isStickyTile, isWallTile } from '$lib/utils/typeguards';
	import { setContext } from 'svelte';
	import Goal from './tiles/Goal.svelte';
	import Letter from './tiles/Letter.svelte';
	import Wall from './tiles/Wall.svelte';
	import Sticky from './tiles/Sticky.svelte';
	import GridContainer from '../graphics/GridContainer.svelte';

	export let grid: GridStore;

	setContext('grid', grid);

	// letters should be the last items to be drawn,
	// so that they are drawn on top of every other tile.
	const sortTiles = (a: Tile) => (a.type === 'letter' ? 1 : -1);
</script>

<GridContainer width={$grid.width} height={$grid.height}>
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
</GridContainer>
