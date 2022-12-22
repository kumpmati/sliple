<script lang="ts">
	import UnderlinedHeading from '$lib/components/UnderlinedHeading.svelte';
	import type { PageData } from './$types';
	import { ArrowLeftIcon } from 'svelte-feather-icons';

	export let data: PageData;
</script>

<a href="/">
	<ArrowLeftIcon />
</a>

<span class="title">
	<UnderlinedHeading color="var(--gray-light)">Puzzle archive</UnderlinedHeading>
</span>

<ul>
	{#each data.puzzles as puzzle (puzzle.id)}
		<li>{new Date(puzzle.publishedAt)}</li>
	{/each}
</ul>

<style lang="scss">
	.title {
		align-self: center;
	}

	a {
		color: var(--black);
		display: grid;
		place-content: center;
		width: fit-content;
		padding: 8px;
	}
</style>
