<script lang="ts">
	import type { BackgroundProps } from '..';

	let { width, height }: BackgroundProps = $props();

	const PADDING = 5;
</script>

<svg width={width + 2} height={height + 2} viewBox="0 0 {width} {height}" overflow="visible">
	<image
		href="/graphics/ice-background-2.svg"
		width={width + PADDING * 2}
		height={height + PADDING * 2}
		x={-PADDING}
		y={-PADDING}
		preserveAspectRatio="none"
	/>
</svg>
