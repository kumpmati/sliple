<script lang="ts">
	import type { BackgroundProps } from '..';

	let { width, height }: BackgroundProps = $props();
</script>

<svg width={width + 2} height={height + 2} viewBox="0 0 {width} {height}" overflow="visible">
	<rect
		x={-1}
		y={-1}
		class="fill-slate-950 stroke-slate-800"
		rx="18"
		width={width + 2}
		height={height + 2}
		stroke-width="2"
	/>
</svg>
