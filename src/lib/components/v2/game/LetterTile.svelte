<script lang="ts">
	import { cn } from '$lib/utils';
	import type { SVGAttributes } from 'svelte/elements';
	import { fade } from 'svelte/transition';

	type Props = {
		letter: string;
		secondaryLetter?: string | null;
		status?: 'none' | 'invalid' | 'valid';
	} & SVGAttributes<SVGElement>;

	let { letter, status, secondaryLetter, ...rest }: Props = $props();
</script>

<svg
	width="64"
	height="64"
	viewBox="0 0 64 64"
	class="overflow-visible"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	{...rest}
>
	<rect
		class={cn(
			'fill-slate-800 transition-colors',
			status === 'invalid' && 'fill-red-700',
			status === 'valid' && 'fill-green-700'
		)}
		width="64"
		height="64"
		rx="16"
	/>

	<g transform="translate(0,-6)">
		<rect
			x="1"
			y="1"
			class={cn(
				'fill-slate-700 stroke-slate-600 transition-colors',
				status === 'invalid' && 'fill-red-500 stroke-red-400',
				status === 'valid' && 'fill-green-500 stroke-green-400'
			)}
			width="62"
			height="62"
			stroke-width="2"
			rx="16"
		/>

		<text
			x="50%"
			y="50%"
			text-anchor="middle"
			dominant-baseline="middle"
			class="fill-white font-heading text-3xl"
		>
			{letter.toLowerCase()}
		</text>

		{#if status === 'invalid' && secondaryLetter}
			<text
				in:fade={{ duration: 200 }}
				x="14"
				y="16"
				text-anchor="middle"
				paint-order="stroke"
				dominant-baseline="middle"
				transform-origin="14 16"
				class={cn(
					'fill-slate-500 font-heading text-xl transition-colors',
					status === 'invalid' && 'fill-red-300'
				)}
			>
				{secondaryLetter.toLowerCase()}
			</text>
		{/if}
	</g>
</svg>
