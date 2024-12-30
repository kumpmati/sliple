<script lang="ts">
	import TablerLineDashed from '~icons/tabler/line-dashed';
	import TablerHash from '~icons/tabler/hash';
	import type { Puzzle } from '$lib/types/puzzle';
	import DistributionChart from './DistributionChart.svelte';
	import { calculatePercentile } from './percentile';
	import TablerLoader2 from '~icons/tabler/loader-2';
	import TablerAlertCircle from '~icons/tabler/alert-circle';
	import TablerUser from '~icons/tabler/user';
	import { getLocalStatsContext } from './local.svelte';
	import type { Snippet } from 'svelte';
	import CompletionStars from '../CompletionStars.svelte';

	type Props = {
		puzzleId: string;
		maxMoves: Puzzle['data']['maxMoves'];
		showStreak?: boolean;
		globalsLoading: boolean;
		globalsError: string | undefined;
		globalDistribution: { value: number; count: number }[];
		globalCompletions: number;
		globalAverageMoves: number;
		children?: Snippet;
	};

	let {
		puzzleId,
		maxMoves,
		showStreak,
		globalsLoading,
		globalsError,
		globalDistribution,
		globalCompletions,
		globalAverageMoves,
		children
	}: Props = $props();

	const localStats = getLocalStatsContext();

	let best = $derived(localStats.current.completions[puzzleId]?.best);
	let latest = $derived(localStats.current.completions[puzzleId]?.latest);

	let percentile = $derived(best ? calculatePercentile(globalDistribution, best.moves) : null);
</script>

<div class="flex flex-col items-center">
	<CompletionStars completion={latest} {maxMoves} />

	{#if latest}
		<p class="mt-2 font-heading text-2xl font-bold text-white">
			{#if latest.win}
				Completed!
			{:else}
				Out of moves!
			{/if}
		</p>

		{#if latest.win || best?.win}
			<p class="text-sm font-normal text-slate-400">
				Best: {best?.moves ?? '--'}, Latest: {latest.win ? latest.moves : '--'}
			</p>
		{/if}
	{:else}
		<p class="mt-2 font-heading text-lg font-normal text-slate-400">
			You haven't completed this puzzle yet
		</p>
	{/if}

	{#if showStreak}
		<div class="mt-8 grid w-full grid-cols-3 gap-4">
			<div class="flex flex-col items-center">
				<span class="font-heading text-3xl font-bold text-white">{1}</span>
				<span class="text-sm text-slate-400">Played</span>
			</div>
			<div class="flex flex-col items-center">
				<span class="font-heading text-3xl font-bold text-white">{1}</span>
				<span class="text-sm text-slate-400">Streak</span>
			</div>
			<div class="flex flex-col items-center">
				<span class="font-heading text-3xl font-bold text-white">{1}</span>
				<span class="text-sm text-slate-400">Max streak</span>
			</div>
		</div>
	{/if}

	<div class="relative grid w-full" style="grid-template-areas: 'a'">
		{#if globalsLoading}
			<div
				class="absolute inset-0 left-0 right-0 z-10 scale-x-110 bg-slate-800/50 backdrop-blur-sm [grid-area:a]"
			></div>

			<p
				class="z-10 inline-flex flex-col items-center justify-center gap-2 text-center text-slate-400 [grid-area:a]"
			>
				<TablerLoader2 class="size-8 animate-spin" />
				Loading global statistics...
			</p>
		{:else if globalsError}
			<div
				class="absolute inset-0 left-0 right-0 z-10 scale-x-110 bg-slate-800/50 backdrop-blur-sm [grid-area:a]"
			></div>
			<p
				class="z-10 inline-flex flex-col items-center justify-center gap-2 text-center text-red-400 [grid-area:a]"
			>
				<TablerAlertCircle class="size-8" />

				{globalsError}
			</p>
		{/if}
		<div class="flex w-full flex-col items-center [grid-area:a]">
			<p class="mt-8 text-sm font-normal text-slate-400">Global statistics</p>
			<DistributionChart
				data={globalDistribution}
				numMoves={best?.moves ?? null}
				averageMoves={globalAverageMoves}
				class="mt-4"
			/>

			<table class="mt-12 w-full text-slate-400">
				<tbody>
					<tr>
						<td class="py-1 text-green-400">
							<span class="inline-flex items-center gap-1">
								<TablerUser class="size-5" />
								Your ranking
							</span>
						</td>
						<td class="min-w-16 text-right font-bold text-green-400">
							{#if percentile === null}
								--
							{:else if percentile < 1}
								{'<1 %'}
							{:else}
								{Math.round(percentile)} %
							{/if}
						</td>
					</tr>
					<tr>
						<td class="py-1">
							<span class="inline-flex items-center gap-1">
								<TablerLineDashed class="size-5 rotate-90 text-slate-500" />
								Average moves
							</span>
						</td>
						<td class="min-w-16 text-right font-bold text-white">
							{globalAverageMoves.toFixed(1)}
						</td>
					</tr>
					<tr>
						<td class="py-1">
							<span class="inline-flex items-center gap-1">
								<TablerHash class="size-5 text-slate-500" />
								Total solves
							</span>
						</td>
						<td class="min-w-16 text-right font-bold text-white">{globalCompletions}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	{@render children?.()}
</div>
