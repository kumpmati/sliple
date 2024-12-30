<script lang="ts">
	import CompletionStars from '../CompletionStars.svelte';
	import type { GameState } from './state.svelte';

	type Props = {
		game: GameState;
	};

	let { game }: Props = $props();
</script>

{#if game.status !== 'ongoing'}
	<div
		class="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 select-none flex-col items-center"
	>
		<div
			class="animated shadow-sharp-lg absolute -inset-x-10 -inset-y-4 origin-center rounded-lg bg-slate-900/90 backdrop-blur-sm"
		></div>

		<div class="animated origin-center">
			<CompletionStars
				completion={{ win: game.status === 'win', moves: game.moves }}
				maxMoves={game.puzzle.data.maxMoves}
			/>
		</div>

		<p class="animated origin-center font-heading text-2xl">
			{#if game.status === 'win'}
				Completed
			{:else}
				Out of moves!
			{/if}
		</p>
	</div>
{/if}

<style lang="scss">
	@keyframes scale-in {
		from {
			scale: 0;
			opacity: 0;
		}
	}

	.animated {
		animation: scale-in 600ms;
		animation-timing-function: cubic-bezier(0.31, 1.67, 0.2, 0.95); // custom bounce
		animation-fill-mode: both;

		&:nth-child(1) {
			animation-delay: 0ms;
		}
		&:nth-child(2) {
			animation-delay: 50ms;
		}
		&:nth-child(3) {
			animation-delay: 100ms;
		}
	}
</style>
