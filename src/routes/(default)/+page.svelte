<script>
	import LargeLink from '$lib/components/LargeLink.svelte';
	import FeaturedPuzzle from '$lib/components/graphics/FeaturedPuzzle.svelte';
	import Logo from '$lib/components/graphics/Logo.svelte';
	import { GameAudio } from '$lib/services/sound';
	import { soundsEnabled } from '$lib/stores/sound';
	import {
		CalendarIcon,
		HelpCircleIcon,
		Volume2Icon,
		VolumeXIcon,
		GlobeIcon,
		EditIcon
	} from 'svelte-feather-icons';

	const toggleSound = () => {
		$soundsEnabled = !$soundsEnabled;
		new GameAudio().play('click');
	};
</script>

<svelte:head>
	<title>Sliple</title>
	<meta name="description" content="Slippery, free puzzle game" />
</svelte:head>

<nav>
	<a href="/about" class="about" aria-label="About the website">
		<HelpCircleIcon />
	</a>

	<div>
		<button class="audio" on:click={toggleSound}>
			{#if $soundsEnabled}
				<Volume2Icon />
			{:else}
				<VolumeXIcon />
			{/if}
		</button>
	</div>
</nav>

<div class="logo">
	<Logo />
</div>

<div class="links">
	<LargeLink
		title="Daily Puzzle"
		description="Every day a new random puzzle!"
		href="/play/daily"
		highlightColor="var(--blue-light)"
	>
		<span slot="icon" class="icon" style="color:var(--blue)">
			<CalendarIcon size="48" strokeWidth={1} />
		</span>
	</LargeLink>

	<LargeLink
		title="Random"
		description="More unique puzzles than you can manage!"
		href="/play/random"
	>
		<span slot="icon" style="color:var(--red)">
			<FeaturedPuzzle />
		</span>
	</LargeLink>
</div>

<h3>Other</h3>
<div class="links">
	<LargeLink
		href="/play/community"
		title="Community Levels"
		description="Solve puzzles made by other players"
		highlightColor="var(--orange-light)"
	>
		<span slot="icon" class="icon" style="color:var(--orange)">
			<GlobeIcon size="48" strokeWidth={1} />
		</span>
	</LargeLink>

	<LargeLink href="/editor" title="Level Editor">
		<EditIcon slot="icon" />
	</LargeLink>

	<LargeLink title="Tutorial" href="/tutorial">
		<HelpCircleIcon slot="icon" />
	</LargeLink>
</div>

<style lang="scss">
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.about,
		.audio {
			width: fit-content;
			color: var(--text);
			padding: 0;
			background-color: transparent;
			border: none;
			cursor: pointer;
		}
	}

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
		color: var(--text-subtle);
		text-align: center;
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
		margin-bottom: 16px;
	}
</style>
