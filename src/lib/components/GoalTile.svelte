<script lang="ts">
	import type { GridStore } from '$lib/stores/grid';
	import type { GoalTile } from '$lib/types/grid';
	import { getContext } from 'svelte';
	import Tile from './Tile.svelte';

	export let tile: GoalTile;

	const store = getContext('grid') as GridStore;

	$: isFilled = store.getAt(tile.x, tile.y).find((t) => t.type === 'letter');
</script>

<Tile {tile} zIndex={1}>
	<p class="goal" class:required={tile.required} class:filled={isFilled} />
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
	}

	.required {
		border: 3px dashed limegreen;
	}

	.goal:not(.required) {
		border: 3px dashed yellow;
		color: yellow;
	}

	.filled {
		color: transparent;
	}

	p {
		margin: 0;
		padding: 0;
	}
</style>
