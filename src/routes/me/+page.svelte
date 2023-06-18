<script lang="ts">
	import PuzzleIcon from '$lib/components/graphics/PuzzleIcon.svelte';
	import { ArrowLeftIcon } from 'svelte-feather-icons';
	import type { PageData } from './$types';
	import { authUser } from '$lib/stores/auth';

	export let data: PageData;
</script>

<a href="/" class="back">
	<ArrowLeftIcon />
</a>

<h1>My profile</h1>

<p>Signed in as {$authUser?.name}</p>

<a href="/auth/signout">Sign Out</a>

<h2>Favourite puzzles</h2>

<ul>
	{#each data.savedPuzzles.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()) as puzzle (puzzle.puzzleId)}
		<li>
			<a href={puzzle.url}>
				<PuzzleIcon size={32} />
				{puzzle.description}
			</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	.back {
		color: var(--black);
		margin-bottom: 1rem;
		width: fit-content;
	}

	h1 {
		margin: 0;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 2px;
		list-style-type: none;
		padding: 0;
		margin: 0;

		a {
			display: flex;
			align-items: center;
			gap: 12px;
			text-decoration: none;
			padding: 6px 6px;
			border-radius: var(--border-radius);
			color: var(--black);

			&:hover {
				background-color: rgba(0, 0, 0, 0.05);
			}
		}
	}
</style>
