<script lang="ts">
	import UnderlinedHeading from './UnderlinedHeading.svelte';
	import { ShareIcon, StarIcon } from 'svelte-feather-icons';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import type { Puzzle } from '$lib/types/puzzle';
	import { getRank } from '$lib/utils/grid';
	import Button from './Button.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import type { ComponentType } from 'svelte';

	export let type: 'win' | 'loss';
	export let moves: number;
	export let puzzle: Puzzle;
	export let shareText: string | null = null;

	type EndMenuButton = {
		onClick: () => any;
		text: string;
		hightlight?: 'loss' | 'win' | 'both';
		icon?: ComponentType;
		enabled?: 'loss' | 'win';
	};

	export let buttons: EndMenuButton[];

	$: rank = getRank(puzzle.data, moves);

	const isGold = () => type === 'win' && rank === 'gold';
	const isSilver = () => type === 'win' && ['silver', 'gold'].includes(rank!);
	const isBronze = () => type === 'win' && ['bronze', 'silver', 'gold'].includes(rank!);
</script>

<div in:fade={{ duration: 200 }} class="content" class:win={type === 'win'}>
	<span transition:fly={{ y: -20, duration: 500, delay: 0, easing: quintOut }}>
		<UnderlinedHeading
			style="font-size: 36px"
			color={type === 'win' ? 'var(--green-light)' : 'var(--red-light)'}
		>
			{#if type === 'win'}
				{#if rank === 'gold'}
					Perfect! 🎉
				{:else if rank === 'silver'}
					Great! 😊
				{:else if rank === 'bronze'}
					Passable 🙂
				{/if}
			{:else}
				Out of moves!
			{/if}
		</UnderlinedHeading>
	</span>

	<!-- TODO: set delay back to 100 when this issue is fixed: https://github.com/sveltejs/svelte/issues/10876  -->
	<div class="stats" transition:fly={{ y: -10, duration: 200, delay: 0, easing: quintOut }}>
		<span class="row">
			<p>Moves used</p>
			<p class="value">{moves} / {puzzle.data.maxMoves.bronze}</p>
		</span>

		<span class="row">
			<p>Ranking</p>
			<span class="ranks">
				<StarIcon size="28" class="star gold {isGold() ? 'filled' : ''}" />
				<StarIcon size="28" class="star silver {isSilver() ? 'filled' : ''}" />
				<StarIcon size="28" class="star bronze {isBronze() ? 'filled' : ''}" />
			</span>
		</span>
	</div>

	<!-- TODO: set delay back to 200 when this issue is fixed: https://github.com/sveltejs/svelte/issues/10876  -->
	<div class="buttons" transition:fly={{ y: -5, duration: 200, delay: 0, easing: quintOut }}>
		{#each buttons as btn}
			<Button
				color={type === 'win' ? 'green' : 'red'}
				highlight={btn.hightlight === 'both' || btn.hightlight === type}
				on:click={btn.onClick}
				disabled={btn.enabled ? btn.enabled !== type : false}
			>
				{btn.text}

				{#if btn.icon}
					<svelte:component this={btn.icon} />
				{/if}
			</Button>
		{/each}

		{#if browser && navigator?.canShare?.({ text: shareText ?? '' })}
			<br />

			<Button
				on:click={() =>
					navigator.share({
						title: 'Sliple',
						url: $page.url.toString(),
						text: shareText ?? ''
					})}
			>
				Share

				<ShareIcon />
			</Button>
		{/if}
	</div>
</div>

<!-- TODO: set delay back to 200 when this issue is fixed: https://github.com/sveltejs/svelte/issues/10876  -->
<div class="underlay" out:fade={{ duration: 200, delay: 0 }}></div>

<style lang="scss">
	.underlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--end-menu-underlay);
		z-index: 2;
	}

	.content {
		padding: 1rem;
		position: absolute;
		left: 50%;
		top: 50%;
		width: 100%;
		transform: translate(-50%, -50%);
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;

		.stats {
			display: flex;
			flex-direction: column;
			gap: 16px;
			width: 100%;
			max-width: 250px;
			margin-top: 30px;
			border-radius: var(--border-radius);
			background-color: var(--bg);
			padding: 16px 32px;

			.ranks {
				border-radius: var(--border-radius);
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 4px;

				:global(.star) {
					stroke: var(--gray-light);
				}

				:global(.star.filled) {
					fill: var(--orange);
					stroke: var(--orange);
				}
			}

			.row {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: var(--text-subtle);

				.value {
					font-weight: bold;
					font-family: var(--font-heading);
					color: var(--text);
				}

				p {
					margin: 0;
				}
			}
		}

		.buttons {
			margin-top: 40px;
			max-width: 250px;
			display: flex;
			flex-direction: column;
			gap: 16px;
			width: 100%;
		}
	}
</style>
