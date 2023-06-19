<script lang="ts">
	import { GRID_CELL_SIZE } from '$lib/constants/grid';
	import type { GridStore } from '$lib/stores/grid';
	import type { GoalTile, LetterTile } from '$lib/types/grid';
	import { getGoalStatus } from '$lib/utils/goal';
	import { getContext } from 'svelte';
	import TileWrapper from './TileWrapper.svelte';

	export let tile: LetterTile;

	const store = getContext('grid') as GridStore;

	$: goalTile = store.getAt(tile.x, tile.y).find((t) => t.type === 'goal') as GoalTile | null;
	$: status = getGoalStatus(goalTile, tile);
</script>

<TileWrapper {tile}>
	<g style:--size="{GRID_CELL_SIZE}px">
		<rect
			data-tile-id={tile.id}
			x="4.5"
			y="4.5"
			width="59"
			height="59"
			rx="8.5"
			fill={status === 'valid'
				? 'var(--green)'
				: status === 'invalid'
				? 'var(--red)'
				: 'var(--tile-bg)'}
			stroke={status === 'valid'
				? 'var(--green-dark)'
				: status === 'invalid'
				? 'var(--red-dark)'
				: 'var(--tile-border)'}
			stroke-width="2"
		/>
		<text
			transform="translate(34, 36)"
			fill={status === 'none' ? 'var(--text)' : 'var(--white)'}
			text-anchor="middle"
			dominant-baseline="middle"
		>
			{tile.letter}
		</text>

		<!--
			If over a goal tile that's not the right one,
			show the underlying goal letter. This improves
			the readability of a puzzle.
		-->
		{#if status === 'invalid' && goalTile}
			<text
				transform="translate(16, 16)"
				fill="var(--white)"
				text-anchor="middle"
				dominant-baseline="middle"
				class="goal-letter"
			>
				{goalTile.letter}
			</text>
		{/if}
	</g>
</TileWrapper>

<style lang="scss">
	text {
		pointer-events: none;
		font-size: 32px;
		font-family: var(--font-heading);

		&.goal-letter {
			font-size: 18px;
			opacity: 0.75;
		}
	}

	g {
		transform-origin: calc(var(--size) / 2) calc(var(--size) / 2);
		transition: scale 50ms, filter 50ms;

		&:active {
			filter: brightness(0.98);
			scale: 0.95;
		}
	}
</style>
