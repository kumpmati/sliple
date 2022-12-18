<script lang="ts">
	import type { GridStore } from '$lib/stores/grid';
	import type { LetterTile, GoalTile } from '$lib/types/grid';
	import { getGoalStatus } from '$lib/utils/goal';
	import { getContext } from 'svelte';
	import Tile from './Tile.svelte';

	export let tile: LetterTile;

	const store = getContext('grid') as GridStore;

	$: goalTile = store.getAt(tile.x, tile.y).find((t) => t.type === 'goal') as GoalTile;
	$: status = getGoalStatus(goalTile, tile);
</script>

<Tile {tile} movable zIndex={3}>
	<p class:inGoal={status !== 'none'} class:valid={status === 'valid'}>
		{tile.letter}
	</p>
</Tile>

<style lang="scss">
	p {
		position: absolute;
		width: calc(100% - 0.5rem);
		height: calc(100% - 0.5rem);
		display: flex;
		align-items: center;
		justify-content: center;
		text-transform: uppercase;
		background-color: #fff;
		border: 3px solid rgba(0, 0, 0, 0.25);
		border-radius: 14px;
		font-size: 3rem;
		pointer-events: none;

		transition: background-color 200ms, color 200ms;

		margin: 0.25rem;
		padding: 0;

		&.valid {
			background-color: limegreen;
		}

		&.inGoal:not(.valid) {
			background-color: red;
			color: white;
		}
	}
</style>
