<script>
	import LargeLink from '$lib/components/LargeLink.svelte';
	import UnderlinedHeading from '$lib/components/UnderlinedHeading.svelte';
	import FeaturedPuzzle from '$lib/components/graphics/FeaturedPuzzle.svelte';
	import { userStore } from '$lib/stores/user';
	import { ArrowLeftIcon, CalendarIcon, HelpCircleIcon, ListIcon } from 'svelte-feather-icons';

	export let data;

	$: latestIsNew = data.latest && !$userStore.puzzles[data.latest.id];
	$: latestPuzzle = data.latest?.data;
</script>

<svelte:head>
	<title>Sliple</title>
	<meta name="description" content="Slippery, free puzzle game" />
</svelte:head>

<nav>
	<a class="back" href="/">
		<ArrowLeftIcon />
	</a>
</nav>

<div class="heading">
	<UnderlinedHeading color="var(--blue-light)" style="font-size:36px">Play</UnderlinedHeading>
</div>

<div class="links">
	<div class="row">
		<LargeLink title="Daily" href="/play/daily" highlightColor="var(--blue-light)">
			<svelte:fragment slot="description">Every day a new random puzzle!</svelte:fragment>

			<span slot="icon" class="icon">
				<CalendarIcon size="48" strokeWidth={1} />
			</span>
		</LargeLink>

		<LargeLink title="Random" href="/play/random">
			<svelte:fragment slot="description">Infinite variation</svelte:fragment>

			<HelpCircleIcon size="48" strokeWidth={1} slot="icon" />
		</LargeLink>
	</div>
</div>

<div class="links">
	<LargeLink
		href="/play/featured/latest"
		title="Featured"
		badge={latestIsNew ? 'New!' : null}
		highlightColor="var(--orange-light)"
	>
		<svelte:fragment slot="description">
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
		</svelte:fragment>

		<FeaturedPuzzle slot="icon" />
	</LargeLink>

	<LargeLink title="Archive" href="/archive">
		<ListIcon slot="icon" />
	</LargeLink>
</div>

<style lang="scss">
	.back {
		color: var(--black);
	}

	.icon {
		display: flex;
		margin-block: 0.5rem;
	}

	.heading {
		margin-top: 1rem;
		margin-bottom: 4rem;
		display: flex;
		justify-content: center;
	}

	.links {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 32px;
	}

	.row {
		display: flex;
		gap: 16px;

		@media screen and (max-width: 500px) {
			flex-direction: column;
		}
	}
</style>
