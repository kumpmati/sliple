<script lang="ts">
	import { cn } from '$lib/utils';
	import { type CompletionEntry } from '$lib/v2/persisted/types';
	import dayjs from 'dayjs';
	import TablerPlay from '~icons/tabler/play';
	import TablerRotateClockwise from '~icons/tabler/rotate-clockwise';

	type Props = {
		current: Date;
		items: CompletionEntry[];
		class?: string;
	};

	let { current, items, class: className }: Props = $props();

	const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
</script>

<div class={className}>
	<div class="grid grid-cols-7 gap-2 text-center text-sm text-slate-400">
		{#each weekdays as day}
			<p>{day}</p>
		{/each}
	</div>

	{#key current}
		<div class="mt-2 grid grid-cols-7 gap-2">
			{#each { length: dayjs(current).startOf('month').day() }}
				<div></div>
			{/each}

			{#each { length: dayjs(current).daysInMonth() }, index}
				{@const day = dayjs(current).startOf('month').add(index, 'days').startOf('day')}
				{@const diff = day.startOf('day').diff(dayjs().startOf('day'), 'days')}
				{@const isToday = diff === 0}
				{@const isFuture = diff > 0}
				{@const entry = items.findLast(
					(item) => dayjs(item.timestamp).format('YYYY-MM-DD') === day.format('YYYY-MM-DD')
				)}

				{#if isToday}
					<a
						href="/play/daily"
						class={cn(
							'flex aspect-square w-full items-center justify-center overflow-hidden rounded-sm border-2 border-transparent text-center transition-colors',
							entry?.best
								? 'border-green-400 bg-green-500 hover:bg-green-400'
								: 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
						)}
					>
						<TablerPlay class="size-5" />
					</a>
				{:else}
					<div
						class={cn(
							'flex aspect-square w-full items-center justify-center rounded-sm border-2 border-transparent text-center',
							entry?.best ? 'border-green-400 bg-green-500' : 'bg-slate-800',
							isFuture && 'bg-slate-950' // future
						)}
					></div>
				{/if}
			{/each}
		</div>
	{/key}
</div>
