<script>
	import Game from '$lib/components/v2/game/Game.svelte';
	import { GameState } from '$lib/components/v2/game/state.svelte';

	let { data } = $props();

	const state = new GameState(data.puzzle);

	state.on('win', () => console.log('you won!'));
</script>

<h1>Daily puzzle</h1>

<button disabled={!state.canUndo} class="disabled:text-slate-500" onclick={() => state.undo()}>
	Undo
</button>

<button onclick={() => state.reset()}>Reset</button>

<Game {state} />

<pre>{JSON.stringify({ moves: state.moves, canUndo: state.canUndo }, null, 2)}</pre>
