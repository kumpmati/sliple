<script lang="ts">
	import Grid from '$lib/components/Grid.svelte';
	import { createGridStore, currentWord } from '$lib/stores/grid';
	import { parseGridFromString } from '$lib/utils/parse';
	import { onMount } from 'svelte';
	import { swipe } from 'svelte-gestures';

	let words: string[] = [];
	let wordsLoaded = false;
	let inputString = 'v1:4,4,7,-;D:1,2;O:0,0;G:3,2;#W:2,1;#G:3,0,-,0;#G:1,3,-,1;#G:3,3,-,2';

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
		if (!id) return;

		store.moveTile(id, dir);
	};

	$: if (words.includes($word.toLowerCase())) {
		alert($word);
	}

	onMount(async () => {
		wordsLoaded = false;
		const w = await fetch('/words.json');
		words = await w.json();
		wordsLoaded = true;
	});
</script>

<main
	use:swipe={{ minSwipeDistance: 20, timeframe: 500, touchAction: 'none' }}
	on:swipe={handleSwipe}
>
	<div class="content">
		<h1>Skidle</h1>

		{#if !wordsLoaded}
			<p>Loading words...</p>
		{/if}

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
