<script lang="ts">
	import FeaturedPuzzle from '$lib/components/graphics/FeaturedPuzzle.svelte';
	import Logo from '$lib/components/graphics/Logo.svelte';
	import { userStore } from '$lib/stores/user';
	import { HelpCircleIcon, ListIcon, PlayIcon } from 'svelte-feather-icons';
	import type { PageData } from './$types';

	export let data: PageData;

	$: latestIsNew = data.latest && !$userStore.puzzles[data.latest.id];
	$: latestPuzzle = data.latest?.data;
</script>

<svelte:head>
	<title>Sliple</title>
</svelte:head>

<a href="/about" class="about" aria-label="About the website">
	<HelpCircleIcon />
</a>

<div class="logo">
	<Logo />
</div>

<h3>Featured</h3>
<div class="links">
	<a class="link highlight" class:new={latestIsNew} href="/puzzle/latest">
		<span class="text">
			{#if latestIsNew}
				<p class="new">New!</p>
			{/if}

			<h2>Featured puzzle</h2>
			<p>
				{#if latestPuzzle}
					Spell “<b>{latestPuzzle.solution.toLowerCase()}</b>” within
					<b
						>{latestPuzzle.maxMoves.bronze ??
							latestPuzzle.maxMoves.silver ??
							latestPuzzle.maxMoves.gold}</b
					> moves
				{:else}
					Solve the puzzle within the given moves
				{/if}
			</p>
		</span>

		<span class="puzzle-icon">
			<FeaturedPuzzle />
		</span>
	</a>

	<a class="link" href="/archive">
		<h2>Puzzle archive</h2>
		<ListIcon />
	</a>
</div>

<h3>Campaign</h3>
<div class="links campaign">
	<a class="link" href="/campaign">
		<h2>Play</h2>
		<PlayIcon />
	</a>

	<a class="link" href="/tutorial">
		<h2>Tutorial</h2>
		<HelpCircleIcon />
	</a>
</div>

<style lang="scss">
	.logo {
		display: flex;
		justify-content: center;
		margin-top: 32px;
		margin-bottom: 50px;
	}

	.about {
		width: fit-content;
		color: var(--black);
	}

	h3 {
		font-family: var(--font-body);
		font-weight: 400;
		font-size: 14px;
		color: var(--gray);
		text-align: center;
	}

	.links {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 32px;
	}

	.campaign {
		flex-direction: row;

		@media screen and (max-width: 550px) {
			flex-direction: column;
		}
	}

	.link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 12px 24px;
		color: var(--black);
		text-decoration: none;

		background-color: var(--white);
		border: 2px solid var(--gray-light);
		border-radius: var(--border-radius);

		transition: transform 200ms;

		&:hover {
			transform: scale(1.01);
		}

		&:active {
			transform: scale(0.97);
		}

		&.highlight {
			border-color: transparent;
			position: relative;
			background-color: var(--orange-light);

			&.new {
				border: 2px solid var(--orange);
			}

			.new {
				border-radius: 20px;
				background-color: var(--red);
				padding: 0px 10px;
				color: var(--white);
				position: absolute;
				top: -10px;
				animation: wiggle 2s both infinite;
			}

			@keyframes wiggle {
				0% {
					transform: translateY(-2px);
				}
				50% {
					transform: translateY(0);
				}
				100% {
					transform: translateY(-2px);
				}
			}
		}

		.text {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 5px;
			margin-right: 30px;
		}

		h2 {
			margin: 0;
			font-size: 20px;
			font-family: var(--font-heading);
		}

		p {
			margin: 0;
			font-size: 14px;
			font-family: var(--font-body);
			color: rgba(0, 0, 0, 0.5);
		}
	}
</style>
