<script lang="ts">
	import { cn } from '$lib/utils';

	type Props = {
		data: { value: number; count: number }[];
		highlightedValue: number;
		class?: string;
	};

	let { data, highlightedValue, class: className }: Props = $props();

	let range = $derived({
		max: Math.max(...data.map((d) => d.value)),
		min: Math.min(...data.map((d) => d.value)),
		maxCount: Math.max(...data.map((d) => d.count))
	});
	let scale = $derived(1 / range.maxCount);
</script>

<div class={cn('flex h-32 w-full items-end justify-center gap-1', className)}>
	{#each data as row (row.value)}
		{@const isHighlighted = row.value === highlightedValue}
		{@const showValue = row.value === range.min || row.value === range.max || isHighlighted}
		<div class="grid h-full w-full grid-rows-[1fr,1rem] flex-col">
			<div
				class={cn(
					'mt-auto flex w-full rounded-[4px] bg-slate-700',
					isHighlighted && 'bg-green-400'
				)}
				style="height: calc({scale * row.count} * 100%)"
			></div>

			<p
				class={cn(
					'h-4 grow-0 text-center text-sm text-transparent',
					showValue && 'text-slate-500',
					isHighlighted && 'font-bold text-green-400'
				)}
			>
				{row.value}
			</p>
		</div>
	{/each}
</div>
