<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import { drawPuzzleAsString } from '$lib/utils/grid';
	import dayjs from 'dayjs';

	let { data } = $props();

	const puzzle = $derived(data.puzzle);

	let val = $state(dayjs(page.url.searchParams.get('date')).format('YYYY-MM-DD'));
	let loading = $state(false);

	const requestSolution = async () => {
		try {
			loading = true;

			const response = await fetch('/api/solver?date=' + val, { method: 'POST' }).then((d) =>
				d.json()
			);
			console.log('optimal solution: ', response);
			invalidateAll();
		} finally {
			loading = false;
		}
	};
</script>

<svelte:head>
	<title>Puzzle solver (DEV ONLY)</title>
</svelte:head>

<main class="flex flex-col gap-4">
	<h1 class="font-bold">NOTE: this page is DEV only.</h1>

	<label>
		Date:
		<input
			class="text-black"
			type="date"
			bind:value={val}
			onchange={() => goto('/api/solver?date=' + val)}
		/>
	</label>

	<pre>puzzle: {puzzle.data.solution} ({puzzle.data.width}x{puzzle.data.height})</pre>
	<pre class="w-fit bg-slate-700 p-2 leading-[1rem] tracking-[1rem]">{drawPuzzleAsString(
			puzzle
		)}</pre>
	<pre>solution: {JSON.stringify(data.solution, null, 2)}</pre>

	<button
		onclick={requestSolution}
		disabled={loading}
		class="bg-white px-4 py-2 text-black hover:bg-slate-100 disabled:opacity-60"
	>
		{#if loading}
			Generating...
		{:else}
			Generate solution for {val}
		{/if}
	</button>
</main>
