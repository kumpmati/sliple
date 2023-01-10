<script lang="ts">
	import type { Campaign } from '$lib/types/campaign';
	import OneStar from './OneStar.svelte';
	import ThreeStar from './ThreeStar.svelte';
	import TwoStar from './TwoStar.svelte';

	export let item: Campaign;
</script>

<a href="/campaign/{item.id}">
	<div class="left">
		<p>0 / {item.levels.length}</p>

		<span class="difficulty">
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
</a>

<style lang="scss">
	a {
		padding: 16px 16px;
		display: grid;
		grid-template-columns: 48px 1fr;
		gap: 16px;
		border-radius: var(--border-radius);
		border: 2px solid var(--gray-light);
		text-decoration: none;
		color: var(--black);
		height: 100%;
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

	.difficulty {
		display: flex;
		justify-content: center;
	}
</style>
