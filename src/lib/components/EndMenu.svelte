<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import UnderlinedHeading from './UnderlinedHeading.svelte';
	import { RotateCcwIcon, ChevronRightIcon } from 'svelte-feather-icons';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let heading: string;
	export let type: 'win' | 'lose';
	export let stats: { moves: string };

	const dispatch = createEventDispatcher();
</script>

<div in:fade|local={{ duration: 200 }} class="content" class:win={type === 'win'}>
	<span transition:fly|local={{ y: -10, duration: 500, easing: quintOut }}>
		<UnderlinedHeading
			style="font-size: 36px"
			color={type === 'win' ? 'var(--green-light)' : 'var(--red-light)'}
		>
			{heading}
		</UnderlinedHeading>
	</span>

	{#if type === 'win'}
		<div class="stats">
			<span class="row">
				<p>Moves used</p>
				<p class="value">{stats.moves}</p>
			</span>
		</div>
	{/if}

	<div class="buttons">
		<button
			transition:fly|local={{ y: -5, duration: 200, delay: 100, easing: quintOut }}
			class="button reset"
			class:highlight={type === 'lose'}
			on:click={() => dispatch('reset')}
		>
			Reset
			<RotateCcwIcon />
		</button>

		<a
			href="/archive"
			class="button more"
			class:highlight={type === 'win'}
			transition:fly|local={{ y: -5, duration: 200, delay: 150, easing: quintOut }}
		>
			More puzzles

			<ChevronRightIcon />
		</a>
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
		background-color: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(5px);
		z-index: 1;
	}

	.content {
		padding: 1rem;
		position: absolute;
		left: 50%;
		top: 40%;
		width: 100%;
		transform: translate(-50%, -50%);
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;

		&.win {
			.reset {
				border: 2px solid var(--gray-light);
				background-color: var(--white);
			}

			.more {
				border: 2px solid var(--green-dark);
				background-color: var(--green-light);
			}
		}

		&:not(.win) {
			.reset {
				border: 2px solid var(--red);
				background-color: var(--red-light);
			}

			.more {
				border: 2px solid var(--gray-light);
				background-color: var(--white);
			}
		}

		.stats {
			display: flex;
			flex-direction: column;
			gap: 16px;
			width: 100%;
			max-width: 250px;
			margin-top: 30px;
			border-radius: var(--border-radius);
			background-color: var(--white);
			padding: 16px 32px;

			.row {
				display: flex;
				justify-content: space-between;
				color: var(--gray);

				.value {
					font-weight: bold;
					font-family: var(--font-heading);
					color: var(--black);
				}

				p {
					margin: 0;
				}
			}
		}

		.buttons {
			margin-top: 40px;
			max-width: 200px;
			display: flex;
			flex-direction: column;
			gap: 16px;
			width: 100%;
		}

		.button {
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
	}
</style>
