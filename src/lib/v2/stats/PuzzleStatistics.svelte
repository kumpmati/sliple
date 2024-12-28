<script lang="ts">
	import type { Puzzle } from '$lib/types/puzzle';
	import TablerStar from '~icons/tabler/star';
	import TablerStarFilled from '~icons/tabler/star-filled';
	import DistributionChart from './DistributionChart.svelte';
	import { calculatePercentile } from './percentile';

	type Props = {
		moves: number | null;
		maxMoves: Puzzle['data']['maxMoves'];
		ownPlayed: number;
		ownStreak: number;
		ownMaxStreak: number;
		globalsLoading: boolean;
		globalsError: string | undefined;
		globalDistribution: { value: number; count: number }[];
		globalCompletions: number;
		globalAverageMoves: number;
	};

	let {
		moves,
		maxMoves,
		ownPlayed,
		ownStreak,
		ownMaxStreak,
		globalsLoading,
		globalsError,
		globalDistribution,
		globalCompletions,
		globalAverageMoves
	}: Props = $props();

	let percentile = $derived(moves ? calculatePercentile(globalDistribution, moves) : null);
</script>

<div class="flex flex-col items-center">
	<div class="flex gap-2">
		{#if moves}
			{#if moves <= maxMoves.gold}
				<TablerStarFilled class="size-8 text-orange-400" />
			{:else}
				<TablerStar class="size-8 text-slate-500" />
			{/if}
			{#if moves <= maxMoves.silver}
				<TablerStarFilled class="size-8 text-orange-400" />
			{:else}
				<TablerStar class="size-8 text-slate-500" />
			{/if}
			{#if moves <= maxMoves.bronze}
				<TablerStarFilled class="size-8 text-orange-400" />
			{:else}
				<TablerStar class="size-8 text-slate-500" />
			{/if}
		{:else}
			<TablerStar class="size-8 text-slate-500" />
			<TablerStar class="size-8 text-slate-500" />
			<TablerStar class="size-8 text-slate-500" />
		{/if}
	</div>

	<p class="mt-2 font-heading text-lg font-normal text-slate-400">
		{#if moves}
			Completed in <span class="font-bold text-white">{moves} moves</span>
		{:else}
			You haven't completed this puzzle yet
		{/if}
	</p>

	<div class="mt-8 grid w-full grid-cols-3 gap-4">
		<div class="flex flex-col items-center">
			<span class="font-heading text-3xl font-bold text-white">{ownPlayed}</span>
			<span class="text-sm text-slate-400">Played</span>
		</div>
		<div class="flex flex-col items-center">
			<span class="font-heading text-3xl font-bold text-white">{ownStreak}</span>
			<span class="text-sm text-slate-400">Streak</span>
		</div>
		<div class="flex flex-col items-center">
			<span class="font-heading text-3xl font-bold text-white">{ownMaxStreak}</span>
			<span class="text-sm text-slate-400">Max streak</span>
		</div>
	</div>

	{#if globalsLoading}
		<p class="text-center text-slate-400">Loading global stats...</p>
	{:else if globalsError}
		<p class="my-4 text-red-400">Error: {globalsError}</p>
	{:else}
		<p class="mt-8 text-sm font-normal text-slate-400">Global distribution</p>
		<DistributionChart
			data={globalDistribution}
			numMoves={moves}
			averageMoves={globalAverageMoves}
			class="mt-4"
		/>

		<table class="mt-16 w-full text-slate-400">
			<tbody>
				<tr>
					<td class="py-1 font-normal text-green-400">Your percentile</td>
					<td class="min-w-16 text-right font-bold text-green-400">
						{#if percentile === null}
							-
						{:else if percentile < 1}
							{'<1 %'}
						{:else}
							{Math.round(percentile)} %
						{/if}
					</td>
				</tr>
				<tr>
					<td class="py-1 font-normal">
						Average moves <span class="text-slate-600">(global)</span>
					</td>
					<td class="min-w-16 text-right font-bold text-white">{globalAverageMoves.toFixed(1)}</td>
				</tr>
				<tr>
					<td class="py-1 font-normal">Solves <span class="text-slate-600">(global)</span></td>
					<td class="min-w-16 text-right font-bold text-white">{globalCompletions}</td>
				</tr>
			</tbody>
		</table>
	{/if}
</div>
