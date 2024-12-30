<script lang="ts">
	import TablerStar from '~icons/tabler/star';
	import TablerStarFilled from '~icons/tabler/star-filled';
	import type { LocalCompletion } from './stats/local.svelte';
	import type { Puzzle } from '$lib/types/puzzle';

	type Props = {
		completion: Pick<LocalCompletion, 'moves' | 'win'> | null | undefined;
		maxMoves: Puzzle['data']['maxMoves'];
	};

	let { completion, maxMoves }: Props = $props();
</script>

<div class="flex gap-2">
	{#if completion}
		{#if completion.moves <= maxMoves.gold && completion.win}
			<TablerStarFilled class="size-8 text-orange-400" />
		{:else}
			<TablerStar class="size-8 text-slate-500" />
		{/if}
		{#if completion.moves <= maxMoves.silver && completion.win}
			<TablerStarFilled class="size-8 text-orange-400" />
		{:else}
			<TablerStar class="size-8 text-slate-500" />
		{/if}
		{#if completion.moves <= maxMoves.bronze && completion.win}
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
