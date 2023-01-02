<script lang="ts">
	import type { Grid } from '$lib/types/grid';
	import type { Writable } from 'svelte/store';

	export let editor: Writable<Grid>;
</script>

<div class="solution">
	<h3>Solution</h3>
	<p class:empty={!$editor.solutions?.[0]}>{$editor.solutions?.[0] ?? '< empty >'}</p>
</div>

<style lang="scss">
	.solution {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 16px 0;

		h3 {
			font-size: 14px;
			font-family: var(--font-heading);
			margin: 0;
		}

		p {
			&.empty {
				color: var(--gray);
			}
		}
	}
</style>
