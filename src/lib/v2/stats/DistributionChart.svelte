<script lang="ts">
	import { cn } from '$lib/utils';
	import { Chart, Svg, Tooltip, Bars, Bar, Axis } from 'layerchart';
	import { scaleBand } from 'd3-scale';
	import { calculatePercentile } from './percentile';

	type Props = {
		data: { value: number; count: number }[];
		numMoves: number | null;
		averageMoves: number;
		class?: string;
	};

	let { data, numMoves, class: className }: Props = $props();
</script>

<div class={cn('h-[200px] w-full', className)}>
	<Chart
		{data}
		x="count"
		y="value"
		yScale={scaleBand().padding(0.15)}
		xDomain={[0, Math.max(...data.map((d) => d.count))]}
		tooltip={{ mode: 'bisect-y' }}
		padding={{ left: 18, right: 18 }}
	>
		<Svg>
			<Axis placement="left" rule classes={{ root: 'fill-slate-600' }} />
			<Axis placement="left" rule ticks={[numMoves]} classes={{ root: 'fill-green-400' }} />

			<Bars>
				{#each data as bar}
					<Bar
						{bar}
						radius={2}
						class={bar.value === numMoves ? 'fill-green-400' : 'fill-slate-700'}
					/>
				{/each}
			</Bars>
		</Svg>

		<Tooltip.Root let:data={item}>
			<Tooltip.List>
				<Tooltip.Item label="Moves:" value={item.value} valueAlign="right" />
				<Tooltip.Separator class="bg-slate-600" />
				<Tooltip.Item
					label="Solves:"
					value={item.count}
					valueAlign="right"
					classes={{ root: 'text-slate-400' }}
				/>
				<Tooltip.Item
					label="Percentile:"
					value="{Math.round(calculatePercentile(data, item.value))} %"
					valueAlign="right"
					classes={{ root: 'text-slate-400' }}
				/>
			</Tooltip.List>
		</Tooltip.Root>
	</Chart>
</div>
