<script lang="ts">
	import { cn } from '$lib/utils';
	import { isGoalTile } from '$lib/utils/typeguards';
	import type { GameState } from './state.svelte';
	import { getGoalStatus } from './utils';

	type Props = {
		state: GameState;
		class?: string;
	};

	let { state, class: className }: Props = $props();
</script>

<div
	class={cn(
		'flex gap-1 rounded-sm border-2 border-slate-800 bg-slate-900 px-3 py-1 font-heading text-2xl',
		className
	)}
>
	{#each state.tiles.filter((t) => isGoalTile(t)).sort((a, b) => a.index - b.index) as t (t.id)}
		{@const { status } = getGoalStatus(state.tiles, t)}
		<span class={cn('text-slate-600 transition-colors', status === 'valid' && 'text-white')}>
			{t.letter}
		</span>
	{/each}
</div>
