<script lang="ts">
	import Grid from '$lib/components/Grid.svelte';
	import { createGridStore, currentWord } from '$lib/stores/grid';
	import { parseGridFromString } from '$lib/utils/parse';
	import { swipe } from 'svelte-gestures';

	let inputString = 'v1:4,4,10;D:1,2;O:0,0;G:3,2;#W:2,1;#G:3,0,D,0;#G:1,3,O,1;#G:3,3,G,2';

	const initialState = parseGridFromString(inputString);
	const store = createGridStore(initialState);
	const word = currentWord(store);

	const handleSubmitString = () => {
		const state = parseGridFromString(inputString);
		store.setState(state);
	};

	const handleSwipe = (e: CustomEvent) => {
		const dir = e.detail.direction;
		const id = e.detail.target.dataset?.['id'];
		if (id) store.moveTile(id, dir);
	};
</script>

<main
	use:swipe={{ minSwipeDistance: 40, timeframe: 300, touchAction: 'none' }}
	on:swipe={handleSwipe}
>
	<div class="content">
		<h1>WordGrid</h1>

		<form on:submit|preventDefault={handleSubmitString}>
			<input type="text" bind:value={inputString} on:submit={() => alert('')} />
			<input type="submit" value="Load" />
		</form>

		<Grid grid={store} />

		<p>Moves left: <b>{$store.maxMoves - $store.numMovesTaken}</b></p>

		<h2>{$word}</h2>
	</div>
</main>

<style lang="scss">
	:global(*) {
		box-sizing: border-box;
	}

	main {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 1rem 0;
	}

	.content {
		margin: 0 auto;
		max-width: 30rem;
		padding: 1rem;
		text-align: center;
		width: 100%;
	}
</style>
