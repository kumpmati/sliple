<script lang="ts">
	import { cn } from '$lib/utils';
	import { fade } from 'svelte/transition';
	import type { LetterTileProps } from '..';

	let { letter, status, secondaryLetter, ...rest }: LetterTileProps = $props();

	const urls: Record<'none' | 'invalid' | 'valid', string> = {
		none: '/graphics/letter-ice-desaturated.svg',
		invalid: '/graphics/letter-ice-invalid.svg',
		valid: '/graphics/letter-ice-valid.svg'
	};
</script>

<svg
	width="64"
	height="64"
	viewBox="0 0 64 64"
	class="overflow-visible [&_#tile-group]:active:translate-y-[-5px]"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	{...rest}
>
	<g id="tile-group" class="translate-y-[-6px] transition-transform">
		<image href={urls[status ?? 'none']} width="64" height="70" />

		<text
			x="50%"
			y="50%"
			text-anchor="middle"
			dominant-baseline="middle"
			class="fill-white font-heading text-[32px]"
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
					status === 'invalid' && 'fill-red-200'
				)}
			>
				{secondaryLetter.toLowerCase()}
			</text>
		{/if}
	</g>
</svg>
