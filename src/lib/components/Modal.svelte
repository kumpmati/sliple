<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { CheckIcon, XIcon } from 'svelte-feather-icons';

	export let title: string = '';
	export let closeButton: boolean;

	const dispatch = createEventDispatcher();
</script>

<div class="container">
	<h2>{title}</h2>

	{#if closeButton}
		<button class="close" on:click={() => dispatch('close')}>
			<XIcon size="16" />
		</button>
	{/if}

	<span class="content">
		<slot />
	</span>

	<button class="confirm" on:click={() => dispatch('confirm')}>
		<CheckIcon />
	</button>
</div>

<style lang="scss">
	.container {
		position: relative;
		border-radius: var(--border-radius-small);
		border: 2px solid var(--gray);
		background-color: var(--white);
		z-index: 100;
		display: flex;
		flex-direction: column;
		box-shadow: 0 15px 23px rgba(0, 0, 0, 0.18);
		max-width: calc(100vw - 32px);

		h2 {
			font-family: var(--font-heading);
			font-size: 16px;
			color: var(--black);
			text-align: center;
			margin: 0;
			margin-top: 12px;
		}

		.content {
			padding: 16px 24px;
		}

		button {
			display: grid;
			place-content: center;
			cursor: pointer;
			border: none;
			border-radius: var(--border-radius);
		}

		.close {
			background-color: transparent;
			color: var(--gray);
			right: 12px;
			top: 12px;
			width: 24px;
			height: 24px;
			position: absolute;
		}

		.confirm {
			background-color: var(--green-light);
			color: var(--black);
			width: fit-content;
			margin: 0 auto;
			margin-bottom: 16px;
			height: 30px;
			width: 74px;
		}
	}
</style>
