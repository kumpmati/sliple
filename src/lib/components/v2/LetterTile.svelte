<script lang="ts">
	import { cn } from '$lib/utils';

	type Props = {
		letter: string;
		secondaryLetter?: string;
		variant?: 'default' | 'error' | 'success';
	};

	let { letter, variant, secondaryLetter }: Props = $props();
</script>

<svg
	width="64"
	height="64"
	viewBox="0 0 64 64"
	class="overflow-visible"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect
		class={cn(
			'fill-slate-800',
			variant === 'error' && 'fill-red-700',
			variant === 'success' && 'fill-green-700'
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
				'fill-slate-700 stroke-slate-600',
				variant === 'error' && 'fill-red-500 stroke-red-400',
				variant === 'success' && 'fill-green-500 stroke-green-400'
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

		{#if secondaryLetter}
			<text
				x="14"
				y="16"
				text-anchor="middle"
				paint-order="stroke"
				dominant-baseline="middle"
				class={cn(
					'fill-slate-500 font-heading text-xl',
					variant === 'error' && 'fill-red-300 stroke-red-500',
					variant === 'success' && 'fill-green-300 stroke-green-500'
				)}
				stroke-width="4"
			>
				{secondaryLetter.toLowerCase()}
			</text>
		{/if}
	</g>
</svg>
