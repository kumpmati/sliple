<script lang="ts">
	import type { LetterBlock } from '$lib/types/grid';

	export let block: LetterBlock;

	$: xPos = (block.x / 5) * 100;
	$: yPos = (block.y / 5) * 100;
</script>

<div data-id={block.id} class="block letter" style:left="{xPos}%" style:top="{yPos}%">
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
		transition: left 200ms, top 200ms;
		user-select: none;
	}

	.letter {
		text-transform: uppercase;
		background-color: #fff;
		border: 3px solid rgba(0, 0, 0, 0.25);
		// box-shadow: 0 0.15rem 0.25rem rgba(0, 0, 0, 0.15);
		font-size: 3rem;
		margin: 0;
		padding: 0;
	}
</style>
