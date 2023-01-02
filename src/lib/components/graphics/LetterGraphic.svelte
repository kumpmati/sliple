<script lang="ts">
	export let letter: string;
</script>

<rect
	x="4.5"
	y="4.5"
	width="59"
	height="59"
	rx="8.5"
	fill={'var(--white)'}
	stroke={'var(--gray)'}
	stroke-width="2"
/>
<text
	transform="translate(34, 36)"
	fill={'var(--white)'}
	text-anchor="middle"
	dominant-baseline="middle"
>
	{letter}
</text>

<style lang="scss">
	text {
		pointer-events: none;
		font-size: 32px;
		font-family: var(--font-heading);
		fill: currentColor;
	}
</style>
