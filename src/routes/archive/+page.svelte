<script lang="ts">
	import UnderlinedHeading from '$lib/components/UnderlinedHeading.svelte';
	import type { PageData } from './$types';
	import { ArrowLeftIcon } from 'svelte-feather-icons';
	import PuzzleIcon from '$lib/components/graphics/PuzzleIcon.svelte';
	import { ChevronRightIcon } from 'svelte-feather-icons';
	import { userStore } from '$lib/stores/user';
	import CompletedPuzzleIcon from '$lib/components/graphics/CompletedPuzzleIcon.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Sliple - Puzzle archive</title>
</svelte:head>

<a href="/" class="back">
	<ArrowLeftIcon />
</a>

<span class="title">
	<UnderlinedHeading color="var(--purple-light)">Puzzle archive</UnderlinedHeading>
</span>

<ul class="links">
	{#each data.puzzles as puzzle (puzzle.id)}
		{@const visited = !!$userStore.puzzles[puzzle.id]}
		{@const solution = puzzle.data.solution.toUpperCase() ?? 'Puzzle'}

		<li>
			<a class="link" class:visited href="/puzzle/{puzzle.id}">
				<span class="icon">
					{#if $userStore.puzzles?.[puzzle.id]?.status === 'completed'}
						<CompletedPuzzleIcon />
					{:else}
						<PuzzleIcon />
					{/if}
				</span>

				<span>
					<p class="upper">{puzzle.publishedAt.toLocaleDateString()}</p>
					<p class="lower">
						{solution} - {puzzle.data.maxMoves.bronze} moves
					</p>
				</span>

				<span class="icon right">
					<ChevronRightIcon />
				</span>
			</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	.title {
		margin-top: 32px;
		align-self: center;
	}

	.back {
		position: absolute;
		top: 8px;
		left: 8px;
		color: var(--black);
		display: grid;
		place-content: center;
		width: fit-content;
		padding: 8px;
	}

	.links {
		margin-top: 60px;
		display: flex;
		flex-direction: column;
		padding: 0;
		list-style: none;
		gap: 16px;

		li {
			display: contents;
		}

		.link {
			display: grid;
			grid-template-columns: auto 1fr auto;
			gap: 16px;
			align-items: center;
			border-radius: var(--border-radius-big);
			color: var(--gray);
			text-decoration: none;
			padding: 4px;

			transition: transform 200ms;

			&:not(.visited) {
				background-color: var(--orange-light);
			}

			&:active {
				transform: scale(0.97);
			}

			&:hover {
				background-color: var(--gray-light);
			}

			p {
				margin: 0;
			}

			.icon {
				display: flex;
				color: var(--black);
			}

			.upper {
				color: var(--black);
				font-family: var(--font-heading);
				font-weight: 900;
			}
		}
	}
</style>
