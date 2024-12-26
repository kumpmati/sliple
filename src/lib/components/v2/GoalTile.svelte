<script lang="ts">
	type Props = { letter: string };

	let { letter }: Props = $props();
</script>

<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
	<rect
		x="1"
		y="1"
		width="62"
		height="62"
		rx="16"
		stroke-width="2"
		stroke-dasharray="10 10"
		class="stroke-slate-600"
	/>

	<text
		x="50%"
		y="50%"
		text-anchor="middle"
		dominant-baseline="central"
		class="fill-slate-600 font-heading text-2xl"
	>
		{letter.toLowerCase()}
	</text>
</svg>
