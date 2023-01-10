<script lang="ts">
	import UnderlinedHeading from '$lib/components/UnderlinedHeading.svelte';
	import type { PageData } from './$types';
	import { ArrowLeftIcon } from 'svelte-feather-icons';
	import PuzzleIcon from '$lib/components/graphics/PuzzleIcon.svelte';
	import { ChevronRightIcon } from 'svelte-feather-icons';
	import { userStore } from '$lib/stores/user';
	import CompletedPuzzleIconGold from '$lib/components/graphics/CompletedPuzzleIconGold.svelte';
	import CompletedPuzzleIconSilver from '$lib/components/graphics/CompletedPuzzleIconSilver.svelte';
	import CompletedPuzzleIconBronze from '$lib/components/graphics/CompletedPuzzleIconBronze.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Sliple - Puzzle archive</title>
</svelte:head>

<a href="/" class="back">
	<ArrowLeftIcon />
</a>

<nav>
	<span class="title">
		<UnderlinedHeading color="var(--purple-light)">Puzzle archive</UnderlinedHeading>
	</span>
</nav>

<ul class="links">
	{#each data.puzzles as puzzle (puzzle.id)}
		{@const status = $userStore.puzzles[puzzle.id]}
		{@const solution = puzzle.data.solution.toUpperCase()}

		<li>
			<a class="link" class:visited={!!status} href="/puzzle/{puzzle.id}">
				<span class="icon">
					{#if status?.status === 'completed'}
						{#if status?.rank === 'gold'}
							<CompletedPuzzleIconGold />
						{:else if status.rank === 'silver'}
							<CompletedPuzzleIconSilver />
						{:else if status.rank === 'bronze'}
							<CompletedPuzzleIconBronze />
						{:else}
							<CompletedPuzzleIconBronze />
						{/if}
					{:else}
						<PuzzleIcon />
					{/if}
				</span>

				<span>
					<p class="upper">{puzzle.publishedAt.toLocaleDateString('fi-FI')}</p>
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
	nav {
		margin-top: 32px;
		display: flex;
		flex-direction: column;
		position: sticky;
		top: 0;
		padding: 8px 0 16px 0;
		background-color: var(--white);
	}

	.title {
		align-self: center;
	}

	.back {
		position: sticky;
		top: 16px;
		left: 8px;
		color: var(--black);
		display: grid;
		place-content: center;
		width: fit-content;
		z-index: 2;
	}

	.links {
		display: flex;
		gap: 16px;
		flex-direction: column;
		margin-top: 60px;
		padding: 0;
		padding-bottom: 60px;
		list-style: none;

		li {
			display: contents;
		}

		.link {
			display: grid;
			grid-template-columns: auto 1fr auto;
			gap: 16px;
			align-items: center;
			border-radius: var(--border-radius);
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
