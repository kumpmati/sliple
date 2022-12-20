<script lang="ts">
	import Grid from '$lib/components/Grid.svelte';
	import { createGridStore, currentWord } from '$lib/stores/grid';
	import { parseGridFromString } from '$lib/utils/parse';
	import { normalizeWord } from '$lib/utils/word';
	import { onMount } from 'svelte';
	import { swipe } from 'svelte-gestures';

	let usedWords = new Set<string>();
	let words: string[] = [];
	let wordsLoaded = false;
	let inputString =
		'v1:6,4,100,-;A:0,0;E:1,0;C:2,0;L:3,0;K:4,0;S:5,0;#G:0,3,-,0;#G:1,3,-,1;#G:2,3,-,2;#G:3,3,-,3;#G:4,3,-,4;#G:5,3,-,5;';

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

	$: if (normalizeWord($word).length > 2) {
		let w = normalizeWord($word);

		if (words.includes(normalizeWord($word)) && !usedWords.has(w)) {
			usedWords.add(w);
			usedWords = usedWords;
		}
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
		<h1>Sliple</h1>

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

		<ul>
			{#each Array.from(usedWords.values()) as w}
				<li>{w}</li>
			{/each}
		</ul>
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

	h1 {
		font-family: var(--font-heading);
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
