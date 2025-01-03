<script lang="ts">
	import { getLocalDbContext } from '$lib/v2/persisted/context';
	import type { CompletionEntry } from '$lib/v2/persisted/types';
	import Underline from '$lib/v2/Underline.svelte';
	import { onMount } from 'svelte';
	import TablerArrowLeft from '~icons/tabler/arrow-left';
	import TablerCalendarMonth from '~icons/tabler/calendar-month';
	import TablerDice3 from '~icons/tabler/dice-3';
	import TablerCircleCheck from '~icons/tabler/circle-check';
	import TablerChevronRight from '~icons/tabler/chevron-right';
	import TablerLoader2 from '~icons/tabler/loader-2';
	import Calendar from './Calendar.svelte';
	import CalendarControls from './CalendarControls.svelte';
	import TablerTrash from '~icons/tabler/trash';
	import { fade } from 'svelte/transition';

	const db = getLocalDbContext();

	let calendar = $state({ currentMonth: new Date() });

	type Data = {
		loading: boolean;
		daily: CompletionEntry[];
		random: CompletionEntry[];
	};

	let data = $state<Data>({
		loading: true,
		daily: [],
		random: []
	});

	const getData = async () => {
		data.loading = true;

		Promise.all([db.getAllDaily(), db.getAllRandom()])
			.then(([daily, random]) => {
				data.daily = daily ?? [];
				data.random = random ?? [];
			})
			.finally(() => (data.loading = false));
	};

	// TODO: only fetch daily items within the calendar range
	onMount(() => {
		getData();
	});

	const clearHistory = async () => {
		if (!confirm('Clear history? You will lose all puzzle completion data forever.')) return;

		await db.clear();
		getData();
	};
</script>

<svelte:head>
	<title>History</title>
</svelte:head>

<main class="mx-auto flex max-w-sm flex-col">
	<div class="flex items-center justify-between">
		<a href="/" aria-label="home" class="w-fit p-1 text-slate-400 hover:text-white">
			<TablerArrowLeft class="size-6" />
		</a>

		<button
			aria-label="clear history"
			class="p-1 text-red-600 hover:text-red-300"
			onclick={clearHistory}
		>
			<TablerTrash class="size-6" />
		</button>
	</div>

	<h1 class="relative z-0 mx-auto mt-4 w-fit font-heading text-3xl font-extrabold">
		History
		<Underline class="bg-blue-900" />
	</h1>

	<div class="relative mt-8 flex flex-col rounded-md bg-slate-900 p-4 pb-8">
		{#if data.loading}
			<div
				class="absolute inset-0 z-10 grid place-content-center rounded-md bg-slate-900/75 backdrop-blur-sm"
				transition:fade={{ duration: 150 }}
			>
				<div class="flex items-center gap-1">
					<TablerLoader2 class="size-5 animate-spin" />
					<p>Loading...</p>
				</div>
			</div>
		{/if}

		<div class="flex items-center justify-between">
			<h2 class="inline-flex items-center gap-1 text-xl font-semibold text-blue-400">
				<TablerCalendarMonth class="size-6" />
				Daily
			</h2>

			<CalendarControls bind:current={calendar.currentMonth} />
		</div>

		<Calendar current={calendar.currentMonth} items={data.daily} class="mt-4" />

		<h2 class="mt-8 inline-flex items-center gap-1 text-xl font-semibold text-orange-400">
			<TablerDice3 class="size-6" />
			Random
		</h2>

		<ul class="mt-1 flex flex-col">
			{#each data.random as entry (entry.puzzleId)}
				<li>
					<a
						href="/play/random/{entry.puzzleId}"
						class="relative z-0 flex items-center py-3 leading-none text-slate-400 outline-none transition-colors hover:text-white [&>.bg]:hover:opacity-100 [&>.bg]:focus-visible:opacity-100"
					>
						<div
							class="bg absolute inset-0 -inset-x-2 z-[-1] rounded-sm bg-slate-800 opacity-0 transition-opacity"
						></div>

						<TablerCircleCheck class="mr-1 size-5 text-green-600" />
						<span class="font-bold text-white">{entry.puzzle.data.solution}</span>

						<div class="ml-auto flex items-center gap-1">
							{entry.best?.moves ?? '-'} moves
							<TablerChevronRight class="size-5" />
						</div>
					</a>
				</li>
			{:else}
				<p class="text-slate-500 mt-2 text-sm">You haven't played any random puzzles yet.</p>
			{/each}
		</ul>
	</div>
</main>
