<script lang="ts">
	import type { GoalBlock } from '$lib/types/grid';

	export let block: GoalBlock;

	$: xPos = (block.x / 5) * 100;
	$: yPos = (block.y / 5) * 100;
</script>

<div class="block goal" style:left="{xPos}%" style:top="{yPos}%" />

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

	.goal {
		border: 3px dashed limegreen;
		pointer-events: none;
	}
</style>
