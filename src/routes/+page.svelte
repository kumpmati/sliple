<script lang="ts">
	import FeaturedPuzzle from '$lib/components/graphics/FeaturedPuzzle.svelte';
	import Logo from '$lib/components/graphics/Logo.svelte';
	import { userStore } from '$lib/stores/user';
	import { ArchiveIcon, HelpCircleIcon } from 'svelte-feather-icons';
	import type { PageData } from './$types';

	export let data: PageData;

	$: latestIsNew = data.latest && !$userStore.puzzles[data.latest.id];
</script>

<svelte:head>
	<title>Sliple</title>
</svelte:head>

<a href="/about" class="about">
	<HelpCircleIcon />
</a>

<div class="logo">
	<Logo />
</div>

<div class="links">
	<a class="link latest" class:new={latestIsNew} href="/puzzle/latest">
		<span class="text">
			{#if latestIsNew}
				<p class="new">New!</p>
			{/if}

			<h2>Latest puzzle</h2>
			<p>Spell the word within the given moves</p>
		</span>

		<span class="puzzle-icon">
			<FeaturedPuzzle />
		</span>
	</a>

	<a class="link" href="/archive">
		<h2>Puzzle archive</h2>
		<ArchiveIcon size="30" strokeWidth={2} />
	</a>
</div>

<h3>Community (coming soon 🚧)</h3>
<div class="links community">
	<div class="link" />
	<div class="link" />
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
		margin-bottom: 50px;
	}

	.link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 14px 18px;
		color: var(--black);
		text-decoration: none;

		background-color: var(--gray-light);
		border-radius: var(--border-radius);

		transition: transform 200ms;
		&:active {
			transform: scale(0.97);
		}

		&.latest {
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
			font-size: 24px;
			font-family: var(--font-heading);
		}

		p {
			margin: 0;
			font-size: 16px;
			font-family: var(--font-body);
			color: rgba(0, 0, 0, 0.5);
		}
	}

	.community {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;

		.link {
			opacity: 0.25;
			cursor: default;

			div {
				background-color: var(--gray);
				display: block;
				height: 20px;
				width: 100%;
				border-radius: var(--border-radius);
				max-width: 70%;
			}
		}
	}
</style>
