<script lang="ts">
	import TablerStar from '~icons/tabler/star';
	import TablerStarFilled from '~icons/tabler/star-filled';
	import type { Puzzle } from '$lib/types/puzzle';
	import { EndType, type CompletionDetails } from './persisted/types';

	type Props = {
		completion: Pick<CompletionDetails, 'moves' | 'endType'> | null | undefined;
		maxMoves: Puzzle['data']['maxMoves'];
	};

	let { completion, maxMoves }: Props = $props();
</script>

<div class="flex gap-2">
	{#if completion}
		{#if completion.moves <= maxMoves.bronze && completion.endType === EndType.WIN}
			<TablerStarFilled class="size-8 text-orange-400" />
		{:else}
			<TablerStar class="size-8 text-slate-500" />
		{/if}

		{#if completion.moves <= maxMoves.silver && completion.endType === EndType.WIN}
			<TablerStarFilled class="size-8 text-orange-400" />
		{:else}
			<TablerStar class="size-8 text-slate-500" />
		{/if}

		{#if completion.moves <= maxMoves.gold && completion.endType === EndType.WIN}
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
