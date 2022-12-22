<script lang="ts">
	export let color: string;
	export let style = '';
</script>

<h1 {style}>
	<slot />
	<div class="underline" style:background-color={color} />
</h1>

<style lang="scss">
	h1 {
		margin: 0;
		width: fit-content;
		position: relative;
		font-weight: 900;
		font-size: 24px;
		color: var(--black);
		font-family: var(--font-heading);

		.underline {
			display: block;
			position: absolute;
			bottom: 0;
			left: -8px;
			width: calc(100% + 16px);
			height: 16px;
			border-radius: 16px;
			z-index: -1;
		}
	}
</style>
