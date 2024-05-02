<script lang="ts">
	import { fly } from 'svelte/transition';

	export let color: string;
	export let style = '';
</script>

<h1 {style}>
	<slot />

	<!-- TODO: set delay back to 200 when this issue is fixed: https://github.com/sveltejs/svelte/issues/10876  -->
	<div
		in:fly={{ y: -5, duration: 300, delay: 0 }}
		class="underline"
		style:background-color={color}
	></div>
</h1>

<style lang="scss">
	h1 {
		margin: 0;
		width: fit-content;
		position: relative;
		font-weight: 900;
		font-size: 24px;
		color: var(--text);
		font-family: var(--font-heading);
		z-index: 1;

		.underline {
			display: block;
			position: absolute;
			bottom: 0;
			left: -8px;
			width: calc(100% + 16px);
			height: 16px;
			border-radius: 16px;
			z-index: -1;

			@media screen and (prefers-color-scheme: dark) {
				filter: brightness(0.5);
			}
		}
	}
</style>
