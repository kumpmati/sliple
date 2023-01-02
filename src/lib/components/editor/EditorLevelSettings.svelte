<script lang="ts">
	import type { Grid } from '$lib/types/grid';
	import type { Writable } from 'svelte/store';

	export let editor: Writable<Grid>;
</script>

<div class="settings">
	<h2>Settings</h2>
	<span class="row">
		<p>Size</p>
		<p class="value">{$editor.width}x{$editor.height}</p>
	</span>
	<span class="row">
		<p>Number of moves</p>
		<p class="value">{$editor.maxMoves}</p>
	</span>
</div>

<style lang="scss">
	.settings {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: var(--border-radius);
		background-color: var(--orange-light);
		padding: 10px 20px 20px 20px;
		max-width: 250px;
		margin: 0 auto;

		p {
			margin: 0;
			color: var(--gray);
		}

		h2 {
			font-family: var(--font-heading);
			font-size: 16px;
			margin: 0;
		}

		.row {
			display: flex;
			justify-content: space-between;
			width: 100%;
			margin: 2px 0;

			.value {
				color: var(--black);
				font-weight: bold;
				font-family: var(--font-heading);
			}
		}
	}
</style>
