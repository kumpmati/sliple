<script lang="ts">
	import { userStore } from '$lib/stores/user';
	import type { Campaign, CampaignLevel } from '$lib/types/campaign';
	import { ChevronRightIcon } from 'svelte-feather-icons';
	import OneStar from './OneStar.svelte';
	import ThreeStar from './ThreeStar.svelte';
	import TwoStar from './TwoStar.svelte';

	export let item: Campaign;

	$: numPuzzlesSolved = item.levels.filter(
		(l) => $userStore.puzzles[l.id]?.status === 'completed'
	).length;
</script>

<a href="/campaign/{item.id}">
	<div class="left">
		<p>{numPuzzlesSolved} / {item.levels.length}</p>

		<span class="difficulty" title="difficulty: {item.difficulty}">
			{#if item.difficulty === 'beginner'}
				<OneStar />
			{:else if item.difficulty === 'moderate'}
				<TwoStar />
			{:else if item.difficulty === 'hard'}
				<ThreeStar />
			{:else if item.difficulty === 'expert'}
				💀
			{/if}
		</span>
	</div>

	<div>
		<h2>{item.name}</h2>
		<p>{item.description}</p>
	</div>

	<span class="arrow">
		<ChevronRightIcon />
	</span>
</a>

<style lang="scss">
	a {
		position: relative;
		padding: 16px 16px;
		display: grid;
		grid-template-columns: 48px 1fr;
		gap: 16px;
		border-radius: var(--border-radius);
		border: 2px solid var(--gray-light);
		text-decoration: none;
		color: var(--black);
		height: 100%;

		transition: transform 200ms;

		&:hover {
			transform: scale(1.025);
		}
	}

	.arrow {
		display: flex;
		position: absolute;
		top: 50%;
		right: 16px;
		opacity: 0;
		transform: translate(-10px, -50%);
		transition: opacity 200ms, transform 200ms;
	}

	a:hover .arrow {
		opacity: 1;
		transform: translate(0px, -50%);
	}

	.difficulty {
		display: flex;
		justify-content: center;
	}

	h2 {
		font-size: 18px;
		margin: 0;
		font-family: var(--font-heading);
		font-weight: 900;
	}

	.left {
		text-align: center;
	}

	p {
		color: var(--gray);
		margin: 0;
	}
</style>
