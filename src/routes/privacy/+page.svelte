<script>
	import TablerArrowLeft from '~icons/tabler/arrow-left';
	import { getBackLink } from '$lib/v2/backlink';
</script>

<svelte:head>
	<title>Privacy</title>
</svelte:head>

<main class="flex flex-col text-slate-400">
	<a
		href={getBackLink('/')}
		aria-label="Back to the front page"
		class="mb-4 w-fit p-2 text-slate-400 hover:text-white"
	>
		<TablerArrowLeft class="size-6" />
	</a>

	<h1 class="mb-4 font-heading text-3xl font-bold text-white">Privacy</h1>

	<p class="mb-4">
		Sliple uses a cookie (<span class="bg-slate-900 px-1 font-mono">uid</span>) to anonymously keep
		track of the number of players that have solved the daily puzzle.
	</p>
	<p class="mb-4">
		The value of the cookie is randomly generated and cannot be used to identify any personal
		information.
	</p>
	<p>
		You can use Sliple normally without accepting cookies, you just won't contribute to the global
		statistics.
	</p>
</main>
