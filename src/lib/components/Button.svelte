<script lang="ts">
	export let color: 'green' | 'red' | 'default' = 'default';
	export let highlight = false;
	export let disabled = false;
</script>

<button on:click class={color} class:highlight {disabled}>
	<slot />
</button>

<style lang="scss">
	button {
		text-decoration: none;
		color: var(--button-text);
		cursor: pointer;
		border-radius: var(--border-radius);
		font-family: var(--font-body);
		font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 16px;
		transition: transform 150ms;

		--bg: var(--button-bg);
		--border: var(--button-border);

		border: 2px solid var(--border);
		background-color: var(--bg);

		&.highlight {
			color: var(--black);

			&.green {
				--bg: var(--green-light);
				--border: var(--green-dark);
			}

			&.red {
				--bg: var(--red-light);
				--border: var(--red);
			}
		}

		&:disabled {
			color: rgba(0, 0, 0, 0.25);
			cursor: default;
		}

		&:hover:not(:disabled) {
			transform: scale(1.025);
		}

		&:active:not(:disabled) {
			transform: scale(0.98);
		}
	}
</style>
