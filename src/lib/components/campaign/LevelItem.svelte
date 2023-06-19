<script lang="ts">
	import type { CompletionRank } from '$lib/types/user';
	import OneStarDots from '../graphics/OneStarDots.svelte';
	import ThreeStarDots from '../graphics/ThreeStarDots.svelte';
	import TwoStarDots from '../graphics/TwoStarDots.svelte';

	export let number: number;
	export let rank: CompletionRank | null;
</script>

<div class={rank}>
	<p>{number}</p>

	<span class="rank">
		{#if rank === 'gold'}
			<ThreeStarDots />
		{:else if rank === 'silver'}
			<TwoStarDots />
		{:else if rank === 'bronze'}
			<OneStarDots />
		{/if}
	</span>
</div>

<style lang="scss">
	div {
		position: relative;
		color: var(--text);
		border: 2px solid var(--text-subtle);
		border-radius: var(--border-radius);
		height: 60px;
		display: grid;
		place-content: center;

		p {
			font-family: var(--font-heading);
			font-size: 20px;
			font-weight: bold;
			margin: 0;
		}

		.rank {
			position: absolute;
			bottom: -8px;
			left: 50%;
			transform: translateX(-50%);
			color: var(--white);
		}

		&.gold {
			color: var(--black);
			border-color: #f3c54f;
			background-color: #f3c54f;
		}

		&.silver {
			color: var(--black);
			border-color: #c9c9c9;
			background-color: #c9c9c9;
		}

		&.bronze {
			color: var(--black);
			border-color: #ff9d67;
			background-color: #ff9d67;
		}
	}
</style>
