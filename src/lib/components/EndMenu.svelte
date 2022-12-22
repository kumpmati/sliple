<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import UnderlinedHeading from './UnderlinedHeading.svelte';
	import { RotateCcwIcon, ChevronRightIcon } from 'svelte-feather-icons';

	export let heading: string;
	export let type: 'win' | 'lose';

	const dispatch = createEventDispatcher();
</script>

<div class="content" class:win={type === 'win'}>
	<UnderlinedHeading
		style="font-size: 36px"
		color={type === 'win' ? 'var(--green-light)' : 'var(--red-light)'}
	>
		{heading}
	</UnderlinedHeading>

	<div class="buttons">
		<button
			class="button reset"
			class:highlight={type === 'lose'}
			on:click={() => dispatch('reset')}
		>
			Reset
			<RotateCcwIcon />
		</button>

		<a href="/archive" class="button more" class:highlight={type === 'win'}>
			More puzzles

			<ChevronRightIcon />
		</a>

		<button class="button close" on:click={() => dispatch('close')}> Close </button>
	</div>
</div>
<div class="underlay" />

<style lang="scss">
	.underlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.75);
		backdrop-filter: blur(5px);
		z-index: 1;
	}

	.content {
		padding: 1rem;
		position: absolute;
		left: 50%;
		top: 40%;
		transform: translate(-50%, -50%);
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;

		&.win {
			.reset {
				background-color: var(--gray-light);
			}

			.more {
				background-color: var(--green-light);
			}
		}

		&:not(.win) {
			.reset {
				background-color: var(--red-light);
			}

			.more {
				background-color: var(--gray-light);
			}
		}

		.buttons {
			max-width: 200px;
			margin-top: 60px;
			display: flex;
			flex-direction: column;
			gap: 16px;
			width: 100%;
		}

		.button {
			border: none;
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

			&:active {
				transform: scale(0.9);
			}
		}

		.close {
			margin-top: 30px;
			background-color: var(--white);
			justify-content: center;
		}
	}
</style>
