<script lang="ts">
	import dayjs from 'dayjs';
	import TablerChevronLeft from '~icons/tabler/chevron-left';
	import TablerChevronRight from '~icons/tabler/chevron-right';

	type Props = {
		current: Date;
	};

	let { current = $bindable() }: Props = $props();

	let isCurrentOrFuture = $derived(
		dayjs(current).startOf('month').toISOString() >= dayjs().startOf('month').toISOString()
	);

	const previousMonth = () => {
		current = dayjs(current).subtract(1, 'month').startOf('month').toDate();
	};

	const nextMonth = () => {
		if (isCurrentOrFuture) return;

		current = dayjs(current).add(1, 'month').startOf('month').toDate();
	};

	const gotoCurrentMonth = () => {
		current = dayjs().startOf('month').toDate();
	};
</script>

<div class="flex items-center gap-3">
	<button
		aria-label="previous month"
		onclick={previousMonth}
		class="p-1 text-slate-400 hover:text-white"
	>
		<TablerChevronLeft class="size-4" />
	</button>

	<button class="w-[80px] text-center" aria-label="current month" onclick={gotoCurrentMonth}>
		{dayjs(current).format('MMM YYYY')}
	</button>

	<button
		aria-label="next month"
		onclick={nextMonth}
		disabled={isCurrentOrFuture}
		class="p-1 text-slate-400 hover:text-white disabled:text-slate-700"
	>
		<TablerChevronRight class="size-4" />
	</button>
</div>
