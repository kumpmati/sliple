<script lang="ts">
	import type { GridStore } from '$lib/stores/grid';
	import type { GoalTile, LetterTile } from '$lib/types/grid';
	import { getGoalStatus } from '$lib/utils/goal';
	import { getContext } from 'svelte';
	import TileWrapper from './TileWrapper.svelte';

	export let tile: LetterTile;

	const store = getContext('grid') as GridStore;

	$: goalTile = store.getAt(tile.x, tile.y).find((t) => t.type === 'goal') as GoalTile;
	$: status = getGoalStatus(goalTile, tile);
</script>

<TileWrapper {tile} movable zIndex={5}>
	<rect
		data-tile-id={tile.id}
		x="2.5"
		y="2.5"
		width="59"
		height="59"
		rx="8.5"
		fill={status === 'valid'
			? 'var(--green)'
			: status === 'invalid'
			? 'var(--red)'
			: 'var(--white)'}
		stroke={status === 'valid'
			? 'var(--green-dark)'
			: status === 'invalid'
			? 'var(--red-dark)'
			: 'var(--gray)'}
		stroke-width="3"
	/>
	<text
		transform="translate(32, 34)"
		fill={status === 'none' ? 'var(--black)' : 'var(--white)'}
		text-anchor="middle"
		dominant-baseline="middle"
	>
		{tile.letter}
	</text>
</TileWrapper>

<style>
	text {
		pointer-events: none;
		font-size: 32px;
		font-family: var(--font-heading);
	}
</style>
