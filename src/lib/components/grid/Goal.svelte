<script lang="ts">
	import type { GridStore } from '$lib/stores/grid';
	import type { GoalTile, LetterTile } from '$lib/types/grid';
	import { getGoalStatus } from '$lib/utils/goal';
	import { getContext } from 'svelte';
	import TileWrapper from './TileWrapper.svelte';

	export let tile: GoalTile;

	const store = getContext('grid') as GridStore;

	$: letterTile = store.getAt(tile.x, tile.y).find((t) => t.type === 'letter') as LetterTile;
	$: status = getGoalStatus(tile, letterTile);
</script>

<TileWrapper {tile} zIndex={0}>
	{#if status === 'none'}
		<rect
			x="2.5"
			y="2.5"
			width="59"
			height="59"
			rx="8.5"
			stroke="var(--red)"
			stroke-width="3"
			stroke-dasharray="10 10"
		/>

		<text transform="translate(32, 34)" text-anchor="middle" dominant-baseline="middle">
			{tile.letter ?? '?'}
		</text>
	{:else}
		<rect
			x="0"
			y="0"
			width="64"
			height="64"
			rx="11"
			stroke={status === 'valid' ? 'var(--green)' : 'var(--red)'}
			stroke-width="8"
		/>
	{/if}
</TileWrapper>

<style>
	text {
		pointer-events: none;
		font-size: 24px;
		font-family: var(--font-heading);
		fill: var(--red);
	}
</style>
