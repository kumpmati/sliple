<script lang="ts">
	import Logo from '$lib/components/graphics/Logo.svelte';

	import { GridIcon, HelpCircleIcon, ListIcon, PlayIcon } from 'svelte-feather-icons';
	import LargeLink from '$lib/components/LargeLink.svelte';
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

<h3>Play</h3>
<div class="links">
	<LargeLink href="/play" title="Play" highlightColor="var(--blue-light)">
		<svelte:fragment slot="description">Daily puzzles, featured puzzles and more!</svelte:fragment>

		<PlayIcon size="48" strokeWidth={1.5} class="challenges" slot="icon" />
	</LargeLink>

	<LargeLink title="Campaigns" href="/campaign">
		<GridIcon slot="icon" size="24" class="campaign" />
	</LargeLink>
</div>

<h3>Other</h3>
<div class="links">
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

	:global(.challenges) {
		opacity: 0.5;
	}

	:global(.campaign) {
		opacity: 0.5;
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
</style>
