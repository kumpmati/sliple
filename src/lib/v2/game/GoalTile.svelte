<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	type Props = {
		letter: string;
	} & SVGAttributes<SVGElement>;

	let { letter, ...rest }: Props = $props();
</script>

<svg
	width="64"
	height="64"
	viewBox="0 0 64 64"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class="overflow-visible"
	{...rest}
>
	<g transform="scale(0.98)" transform-origin="32 32">
		<rect
			x="1"
			y="1"
			width="62"
			height="62"
			rx="15"
			stroke-width="2"
			stroke-dasharray="6 10"
			stroke-linecap="round"
			class="stroke-slate-600"
		/>

		<text
			x="50%"
			y="50%"
			text-anchor="middle"
			dominant-baseline="central"
			class="fill-slate-600 font-heading text-2xl font-normal"
		>
			{letter.toLowerCase()}
		</text>
	</g>
</svg>
