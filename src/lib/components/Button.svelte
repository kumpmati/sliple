<script lang="ts">
	export let color: 'green' | 'red' | 'default' = 'default';
	export let highlight = false;
</script>

<button on:click class={color} class:highlight>
	<slot />
</button>

<style lang="scss">
	button {
		text-decoration: none;
		color: var(--black);
		cursor: pointer;
		border-radius: var(--border-radius);
		font-family: var(--font-body);
		font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 16px;
		transition: transform 200ms;

		--bg: var(--white);
		--border: var(--gray-light);

		border: 2px solid var(--border);
		background-color: var(--bg);

		&.highlight {
			&.green {
				--bg: var(--green-light);
				--border: var(--green-dark);
			}

			&.red {
				--bg: var(--red-light);
				--border: var(--red);
			}
		}

		&:hover {
			transform: scale(1.03);
		}

		&:active {
			transform: scale(0.9);
		}
	}
</style>
