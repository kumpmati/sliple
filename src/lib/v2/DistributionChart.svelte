<script lang="ts">
	import { cn } from '$lib/utils';
	import {
		Area,
		Chart,
		LinearGradient,
		Spline,
		Svg,
		Tooltip,
		Highlight,
		Rule,
		Text,
		Rect
	} from 'layerchart';
	import { curveCardinal } from 'd3-shape';
	import { normalise } from './stats/normalise';

	type Props = {
		data: { value: number; count: number }[];
		numMoves: number;
		averageMoves: number;
		class?: string;
	};

	let { data, numMoves, averageMoves, class: className }: Props = $props();

	let max = $derived(Math.max(...data.map((d) => d.value)));
	let min = $derived(Math.min(...data.map((d) => d.value)));
</script>

<div class={cn('h-32 w-full', className)}>
	<Chart
		{data}
		x="value"
		y="count"
		yNice
		tooltip={{ mode: 'bisect-x' }}
		padding={{ left: 4, right: 4 }}
		let:width
		let:height
	>
		<Svg>
			<LinearGradient class="from-slate-700 to-slate-700/0" vertical let:url>
				<Area
					curve={curveCardinal.tension(0.2)}
					line={{ class: 'stroke-2 stroke-primary' }}
					fill={url}
				/>
			</LinearGradient>

			<Spline class="stroke-slate-400 stroke-2" curve={curveCardinal.tension(0.2)} />

			<Text
				x={width * normalise(min, min, max)}
				y={height + 8}
				verticalAnchor="start"
				textAnchor="middle"
				class="fill-slate-500"
				value={min}
			/>
			<Text
				x={width * normalise(max, min, max)}
				y={height + 8}
				verticalAnchor="start"
				textAnchor="middle"
				class="fill-slate-500"
				value={max}
			/>

			<Rule
				x={averageMoves}
				class="stroke-slate-500  stroke-2 [stroke-dasharray:4] [stroke-linecap:round]"
			/>
			<Text
				x={width * normalise(averageMoves, min, max)}
				y={height + 8}
				verticalAnchor="start"
				textAnchor="middle"
				class="fill-slate-500 stroke-slate-800 stroke-[8] font-bold [stroke-linejoin:round]"
				value="avg"
			/>

			<Rule x={numMoves} class="stroke-green-400 stroke-2 [stroke-linecap:round]" />
			{#if numMoves >= min && numMoves <= max}
				<Text
					x={width * normalise(numMoves, min, max)}
					y={height + 8}
					verticalAnchor="start"
					textAnchor="middle"
					class="fill-green-400 stroke-slate-800 stroke-[8] font-bold [stroke-linejoin:round]"
					value={numMoves}
				/>
			{/if}

			<Highlight points />
		</Svg>

		<Tooltip.Root let:data>
			<Tooltip.List>
				<Tooltip.Item label="Moves:" value={data.value} valueAlign="right" />
				<Tooltip.Item label="Solves:" value={data.count} valueAlign="right" />
			</Tooltip.List>
		</Tooltip.Root>
	</Chart>
</div>
