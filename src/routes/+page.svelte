<script>
	import LargeLink from '$lib/components/LargeLink.svelte';
	import FeaturedPuzzle from '$lib/components/graphics/FeaturedPuzzle.svelte';
	import Logo from '$lib/components/graphics/Logo.svelte';
	import { userStore } from '$lib/stores/user';
	import {
		BookmarkIcon,
		CalendarIcon,
		GridIcon,
		HelpCircleIcon,
		ListIcon
	} from 'svelte-feather-icons';

	export let data;

	$: latestIsNew = data.latest && !$userStore.puzzles[data.latest.id];
	$: latestPuzzle = data.latest?.data;
</script>

<svelte:head>
	<title>Sliple</title>
	<meta name="description" content="Slippery, free puzzle game" />
</svelte:head>

<a href="/about" class="about" aria-label="About the website">
	<HelpCircleIcon />
</a>

<div class="logo">
	<Logo />
</div>

<div class="links">
	<div class="row">
		<LargeLink title="Daily" href="/play/daily" highlightColor="var(--blue-light)">
			<svelte:fragment slot="description">Every day a new random puzzle!</svelte:fragment>

			<span slot="icon" class="icon" style="color:var(--blue)">
				<CalendarIcon size="48" strokeWidth={1} />
			</span>
		</LargeLink>

		<LargeLink title="Random" href="/play/random">
			<svelte:fragment slot="description">Infinite variations</svelte:fragment>

			<span slot="icon" style="color:var(--red)">
				<FeaturedPuzzle />
			</span>
		</LargeLink>
	</div>

	<br />

	<LargeLink
		href="/play/featured/latest"
		title="Featured"
		badge={latestIsNew ? 'New!' : null}
		highlightColor="var(--orange-light)"
	>
		<svelte:fragment slot="description">
			{#if latestPuzzle}
				Spell “<b>{latestPuzzle.solution.toLowerCase()}</b>” within
				<b>{latestPuzzle.maxMoves.bronze}</b> moves
			{:else}
				Solve the puzzle within the given moves
			{/if}
		</svelte:fragment>

		<span slot="icon" style="display:contents;color:var(--orange);">
			<BookmarkIcon size="48" strokeWidth={1} />
		</span>
	</LargeLink>

	<LargeLink title="Puzzle archive" href="/archive">
		<ListIcon slot="icon" />
	</LargeLink>
</div>

<h3>Other</h3>
<div class="links">
	<LargeLink title="Campaigns" href="/campaign">
		<GridIcon slot="icon" />
	</LargeLink>

	<LargeLink title="Tutorial" href="/tutorial">
		<HelpCircleIcon slot="icon" />
	</LargeLink>
</div>

<style lang="scss">
	.logo {
		display: flex;
		justify-content: center;
		margin-top: 32px;
		margin-bottom: 50px;
	}

	h3 {
		font-family: var(--font-body);
		font-weight: 400;
		font-size: 14px;
		color: var(--gray);
		text-align: center;
	}

	.about {
		width: fit-content;
		color: var(--black);
	}

	.icon {
		display: flex;
		margin-block: 0.5rem;
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
