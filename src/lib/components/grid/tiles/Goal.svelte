<script lang="ts">
	import type { GridStore } from '$lib/stores/grid';
	import type { GoalTile, LetterTile } from '$lib/types/grid';
	import { getGoalStatus } from '$lib/utils/goal';
	import { getContext } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import TileWrapper from './TileWrapper.svelte';

	export let tile: GoalTile;

	const store = getContext('grid') as GridStore;

	$: letterTile = store.getAt(tile.x, tile.y).find((t) => t.type === 'letter') as LetterTile;
	$: status = getGoalStatus(tile, letterTile);
</script>

<TileWrapper {tile}>
	{#if status === 'none'}
		<rect
			out:fade={{ duration: 100 }}
			in:fade={{ duration: 0 }}
			x="4.5"
			y="4.5"
			width="59"
			height="59"
			rx="8.5"
			stroke="var(--red)"
			stroke-width="2"
			stroke-dasharray="10 10"
		/>

		<text
			transition:fade={{ duration: 150 }}
			transform="translate(34, 37)"
			text-anchor="middle"
			dominant-baseline="middle"
		>
			{tile.letter ?? '?'}
		</text>
	{:else}
		<rect
			in:scale={{ duration: 200, delay: 100 }}
			out:scale={{ duration: 0 }}
			x="0"
			y="0"
			width="68"
			height="68"
			rx="12"
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

	rect {
		transform-origin: 34px 34px;
	}
</style>
