<script lang="ts">
	import LargeLink from '$lib/components/LargeLink.svelte';
	import UnderlinedHeading from '$lib/components/UnderlinedHeading.svelte';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';

	dayjs.extend(relativeTime);

	import { ArrowLeftIcon } from 'svelte-feather-icons';

	export let data;
</script>

<svelte:head>
	<title>Community Levels</title>
</svelte:head>

<nav>
	<a href="/">
		<ArrowLeftIcon />
	</a>
</nav>

<span class="heading">
	<UnderlinedHeading color="var(--orange)">Community Levels</UnderlinedHeading>
</span>

<ul>
	{#each data.puzzles as puzzle}
		<li>
			<a href="/play/community/{puzzle.code}" class="level">
				<p class="name">{puzzle.name}</p>
				<small>
					{dayjs(puzzle.createdAt).fromNow()}
				</small>
			</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	a {
		color: var(--text);
	}

	.heading {
		margin-top: 32px;
		margin-bottom: 32px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		grid-auto-rows: 150px;
		gap: 0.5rem;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.level {
		height: 100%;
		font-family: var(--font-heading);
		display: flex;
		justify-content: flex-end;
		flex-direction: column;
		text-decoration: none;
		background-color: var(--button-bg);
		color: var(--button-text);
		padding: 1rem;
		border-radius: var(--border-radius);
		transition:
			transform 100ms,
			filter 100ms;

		&:hover {
			transform: translateY(-1px);
			filter: brightness(1.1);

			small {
				color: var(--text);
			}
		}

		&:active {
			transform: translateY(1px);
			filter: brightness(0.9);
		}

		.name {
			font-size: 1.25rem;
			font-weight: bold;
		}

		small {
			color: var(--text-subtle);
		}

		p {
			margin: 0;
		}
	}
</style>
