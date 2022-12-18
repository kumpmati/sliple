<script lang="ts">
	import type { GridStore } from '$lib/stores/grid';
	import type { WallBlock } from '$lib/types/grid';
	import { getContext } from 'svelte';

	export let block: WallBlock;

	const store = getContext('grid') as GridStore;

	$: xPos = (block.x / $store.width) * 100;
	$: yPos = (block.y / $store.height) * 100;
</script>

<div
	class="block wall"
	style:left="{xPos}%"
	style:top="{yPos}%"
	style:width="{(1 / $store.width) * 100}%"
	style:height="{(1 / $store.height) * 100}%"
/>

<style lang="scss">
	.block {
		position: absolute;
		display: grid;
		place-content: center;
		width: 20%;
		height: 20%;
		border-radius: 15px;
		transition: left 200ms, top 200ms;
		user-select: none;
	}

	.wall {
		border: 3px solid rgba(0, 0, 0, 0.25);
		pointer-events: none;
		z-index: 0;
		background-color: gray;
	}
</style>
