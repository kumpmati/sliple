<script lang="ts">
	import type { GridStore } from '$lib/stores/grid';
	import type { LetterBlock } from '$lib/types/grid';
	import { getContext } from 'svelte';

	export let block: LetterBlock;

	const store = getContext('grid') as GridStore;

	$: xPos = (block.x / $store.width) * 100;
	$: yPos = (block.y / $store.height) * 100;

	$: inGoal = store.getAt(block.x, block.y).find((b) => b.type === 'goal');
</script>

<div
	data-id={block.id}
	class="block letter"
	class:goal={inGoal}
	style:left="{xPos}%"
	style:top="{yPos}%"
	style:width="{(1 / $store.width) * 100}%"
	style:height="{(1 / $store.height) * 100}%"
>
	{block.letter}
</div>

<style lang="scss">
	.block {
		position: absolute;
		display: grid;
		place-content: center;
		width: 20%;
		height: 20%;
		border-radius: 15px;
		transition: left 200ms, top 200ms, background-color 200ms;
		user-select: none;
	}

	.letter {
		text-transform: uppercase;
		background-color: #fff;
		border: 3px solid rgba(0, 0, 0, 0.25);
		// box-shadow: 0 0.15rem 0.25rem rgba(0, 0, 0, 0.15);
		font-size: 3rem;
	}

	.goal {
		background-color: limegreen;
	}
</style>
