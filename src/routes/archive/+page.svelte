<script lang="ts">
	import UnderlinedHeading from '$lib/components/UnderlinedHeading.svelte';
	import type { PageData } from './$types';
	import { ArrowLeftIcon } from 'svelte-feather-icons';
	import PuzzleIcon from '$lib/components/graphics/PuzzleIcon.svelte';
	import { ChevronRightIcon } from 'svelte-feather-icons';

	export let data: PageData;
</script>

<a href="/" class="back">
	<ArrowLeftIcon />
</a>

<span class="title">
	<UnderlinedHeading color="var(--gray-light)">Puzzle archive</UnderlinedHeading>
</span>

<ul class="links">
	{#each data.puzzles as puzzle (puzzle.id)}
		{@const solutions = puzzle.data.solutions.map((s) => s.toUpperCase()) ?? 'Puzzle'}

		<li>
			<a class="link" href="/puzzle/{puzzle.id}">
				<span class="icon">
					<PuzzleIcon />
				</span>

				<span>
					<p class="upper">
						<span class="dark">{solutions.join(' | ')}</span>
						-
						{puzzle.data.maxMoves} moves
					</p>
					<p class="date">{new Date(puzzle.publishedAt).toLocaleDateString()}</p>
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
				font-family: var(--font-heading);
				font-weight: 900;
			}

			.dark {
				color: var(--black);
			}
		}
	}
</style>