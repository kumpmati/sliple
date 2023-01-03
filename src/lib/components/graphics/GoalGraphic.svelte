<script lang="ts">
	export let letter: string;
</script>

<rect
	x="4.5"
	y="4.5"
	width="59"
	height="59"
	rx="8.5"
	stroke="var(--red)"
	stroke-width="2"
	stroke-dasharray="10 10"
	fill="transparent"
/>

<text transform="translate(34, 37)" text-anchor="middle" dominant-baseline="middle">
	{letter ?? '?'}
</text>

<style>
	text {
		pointer-events: none;
		font-size: 24px;
		font-family: var(--font-heading);
		fill: var(--red);
	}
</style>
