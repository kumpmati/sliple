<script lang="ts">
	import type { GridStore } from '$lib/stores/grid';
	import type { StickyBlock } from '$lib/types/grid';
	import { getContext } from 'svelte';

	export let block: StickyBlock;

	const store = getContext('grid') as GridStore;

	$: xPos = (block.x / $store.width) * 100;
	$: yPos = (block.y / $store.height) * 100;
</script>

<div
	class="block sticky"
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
		border-radius: 100%;
		transition: left 200ms, top 200ms;
		user-select: none;
	}

	.sticky {
		border: 3px dashed limegreen;
		pointer-events: none;
		z-index: -1;
		background-color: limegreen;
	}
</style>
