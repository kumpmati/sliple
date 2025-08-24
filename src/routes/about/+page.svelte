<script>
	import { version } from '$app/environment';
	import { getBackLink } from '$lib/v2/backlink';
	import CookieConsent from '$lib/v2/cookies/CookieConsent.svelte';
	import TablerArrowLeft from '~icons/tabler/arrow-left';

	let show = $state(false);
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="Information about the game" />
</svelte:head>

<main class="flex flex-col text-slate-400">
	<a
		href={getBackLink('/')}
		aria-label="Back to the front page"
		class="mb-4 w-fit p-2 text-slate-400 hover:text-white"
	>
		<TablerArrowLeft class="size-6" />
	</a>

	<h1 class="mt-4 font-heading text-3xl font-bold text-white">About</h1>
	<pre class="mt-2 w-fit rounded-sm bg-slate-900 px-2">{version}</pre>

	<p class="mt-4">
		Sliple is a free web game where you try to spell words by sliding letter tiles on a grid. That's
		pretty much it. Hope you have fun!
	</p>

	<h2 class="mt-4 font-heading text-xl font-bold text-white">Contact</h2>
	<p>
		If you have feedback, you can sent it here:
		<a
			href="https://forms.gle/Ba5yhAYF2uQm3w31A"
			target="_blank"
			rel="noreferrer"
			class="text-white hover:underline"
		>
			Feedback Form
		</a>
	</p>

	<p>
		You can also contact me using:
		<a href="mailto:contact@sliple.app" class="text-white hover:underline"> contact@sliple.app </a>
	</p>

	<h2 class="mt-4 font-heading text-xl font-bold text-white">Support</h2>

	<p>I will keep the game both free and ad-free anyways, but you can donate if you want.</p>

	<a href="https://buymeacoffee.com/kumpmati" target="_blank" rel="noreferrer" class="mt-8 w-fit">
		<img width="150px" src="bmc.svg" alt="Buy me a coffee" />
	</a>

	<footer class="mt-8">
		<div class="flex items-center gap-4">
			<a href="/privacy?back=/about" class="w-fit hover:text-white">Privacy</a>
			<button onclick={() => (show = true)} class="hover:text-white">Cookie consent</button>
		</div>

		<p class="mt-4 text-xs text-slate-600">© Copyright 2025 - Matias Kumpulainen</p>
	</footer>
</main>

<CookieConsent bind:show />
