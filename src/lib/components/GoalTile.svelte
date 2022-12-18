<script lang="ts">
	import type { GridStore } from '$lib/stores/grid';
	import type { GoalTile, LetterTile } from '$lib/types/grid';
	import { getGoalStatus } from '$lib/utils/goal';
	import { getContext } from 'svelte';
	import Tile from './Tile.svelte';

	export let tile: GoalTile;

	const store = getContext('grid') as GridStore;

	$: letterTile = store.getAt(tile.x, tile.y).find((t) => t.type === 'letter') as LetterTile;
	$: status = getGoalStatus(tile, letterTile);
</script>

<Tile {tile} zIndex={1}>
	<p
		class="goal"
		class:required={!!tile.letter}
		class:valid={status === 'valid'}
		class:filled={status !== 'none'}
	>
		{tile.letter ?? ''}
	</p>
</Tile>

<style lang="scss">
	.goal {
		position: absolute;
		display: grid;
		place-content: center;
		width: calc(100% - 0.25rem);
		height: calc(100% - 0.25rem);
		color: limegreen;
		font-size: 2rem;
		pointer-events: none;
		border-radius: 15px;
		margin: 0.125rem;

		border: 3px dashed var(--color);
		color: var(--color);

		--color: limegreen;
	}

	.valid {
		--color: limegreen;
	}

	.goal:not(.valid) {
		&.required {
			--color: red;
		}

		&:not(.required) {
			--color: orange;
		}
	}

	.filled {
		border-style: solid;
		color: transparent;
	}

	p {
		margin: 0;
		padding: 0;
	}
</style>
