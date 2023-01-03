<script lang="ts">
	import type { GridStore } from '$lib/stores/grid';
	import type { Readable } from 'svelte/store';

	export let grid: GridStore;
	export let word: Readable<string>;
</script>

<div class="container">
	{#each $grid.solutions[0]?.split('') as letter, index}
		<div class="slot" class:correct={$word.at(index) === letter}>
			<p>{letter}</p>
		</div>
	{/each}
</div>

<style lang="scss">
	.container {
		display: flex;
		gap: 8px;
		padding: 8px;
		border-radius: var(--border-radius-big);
	}

	.slot {
		display: grid;
		place-content: center;
		width: 40px;
		height: 40px;
		background-color: var(--gray-light);
		border-radius: var(--border-radius);
		border: 2px solid transparent;
		font-size: 20px;
		font-family: var(--font-heading);
		color: transparent;

		transition: background-color 200ms, color 200ms, border-color 200ms;

		&.correct {
			background-color: var(--white);
			border-color: var(--gray);
			color: var(--black);
		}
	}
</style>
