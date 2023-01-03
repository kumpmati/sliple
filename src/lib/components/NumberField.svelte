<script lang="ts">
	export let value: number;
	export let placeholder = '';
	export let style = '';
	export let min: number | null;
	export let max: number | null;
</script>

<input type="number" bind:value {placeholder} {style} {min} {max} />

<style lang="scss">
	input {
		border: 2px solid transparent;
		border-radius: var(--border-radius-small);
		background-color: var(--gray-light);
		font-family: var(--font-heading);
		color: var(--black);
		font-size: 16px;
		padding: 4px 8px;
		outline: none;

		&:focus {
			border-color: var(--black);
		}
	}
</style>
