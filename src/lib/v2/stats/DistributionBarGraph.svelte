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

<div
	class={cn('grid h-32 w-full items-end  gap-0.5 overflow-x-auto xs:gap-1', className)}
	style="grid-template-columns: repeat({data.length}, 1fr)"
>
	{#each data as row (row.value)}
		{@const isHighlighted = row.value === highlightedValue}
		{@const showValue = row.value === range.min || row.value === range.max || isHighlighted}
		<div class="grid h-full w-8 grid-rows-[1fr,1rem] flex-col [&_p]:hover:opacity-100">
			<div
				class={cn(
					'relative mt-auto flex w-full items-center rounded-[4px] bg-slate-700',
					isHighlighted && 'bg-green-400'
				)}
				style="height: calc({scale * row.count} * 100%)"
			>
				<p
					class={cn(
						'absolute -top-6 left-1/2 z-10 mt-1 -translate-x-1/2 text-sm text-slate-400 opacity-0 transition-opacity',
						isHighlighted && 'text-green-400'
					)}
				>
					({row.count})
				</p>
			</div>

			<p
				class={cn(
					'h-4 min-w-0 grow-0 text-center text-sm text-slate-500 opacity-0 transition-colors',
					showValue && 'opacity-100',
					isHighlighted && 'font-bold text-green-400 opacity-100'
				)}
			>
				{row.value}
			</p>
		</div>
	{/each}
</div>
