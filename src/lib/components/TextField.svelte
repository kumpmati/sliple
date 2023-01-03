<script lang="ts">
	export let value: string;
	export let placeholder = '';
	export let style = '';
	export let maxLength: number | null = null;
</script>

<input type="text" bind:value {placeholder} {style} maxlength={maxLength} />

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
