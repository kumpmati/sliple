<script lang="ts">
	import Grid from '$lib/components/grid/Grid.svelte';
	import { createGridStore } from '$lib/stores/grid';
	import type { GoalTile, LetterTile, StickyTile, WallTile } from '$lib/types/grid';
	import type { Puzzle } from '$lib/types/puzzle';
	import { nanoid } from 'nanoid';

	const grid = createGridStore({
		width: 5,
		height: 5,
		maxMoves: 10,
		numMovesTaken: 0,
		mode: 'predefined',
		solutions: [],
		tiles: []
	});

	let w = 5;
	let h = 5;
	let type = 'letter';
	let letter = 'A';
	let x = 0;
	let y = 0;
	let index = 0;
	let inputString = '';

	$: grid.setState({ ...$grid, width: w });
	$: grid.setState({ ...$grid, height: h });

	const handleSubmit = () => {
		const state = $grid;
		const id = nanoid();

		const tile = { id, x, y, type };

		switch (type) {
			case 'letter': {
				state.tiles.push({ ...tile, letter } as LetterTile);
				break;
			}

			case 'wall': {
				state.tiles.push(tile as WallTile);
				break;
			}

			case 'sticky': {
				state.tiles.push(tile as StickyTile);
				break;
			}

			case 'goal': {
				state.tiles.push({ ...tile, letter, index: index++ } as GoalTile);
				break;
			}
		}

		grid.setState(state);
	};

	const handleCopy = async () => {
		const puzzle: Puzzle = {
			id: nanoid(),
			publishedAt: new Date(),
			data: $grid
		};

		navigator.clipboard.writeText(JSON.stringify(puzzle));
	};
</script>

<main>
	<div>
		<h1>Level editor (work in progress)</h1>
		<p>You shouldn't be able see this yet, but I'm lazy...</p>
		<form
			on:submit|preventDefault={() => {
				const state = JSON.parse(inputString);
				grid.setState(state);
			}}
		>
			<input type="text" bind:value={inputString} />
			<input type="submit" value="load from JSON string" />
		</form>

		<form on:submit|preventDefault={handleSubmit}>
			<label>
				Width
				<input type="number" bind:value={w} />
			</label>
			<label>
				Height
				<input type="number" bind:value={h} />
			</label>

			<div class="types">
				<p>Type</p>
				<label>
					Letter
					<input type="radio" bind:group={type} value="letter" />
				</label>
				<label>
					Wall
					<input type="radio" bind:group={type} value="wall" />
				</label>
				<label>
					Sticky
					<input type="radio" bind:group={type} value="sticky" />
				</label>
				<label>
					Goal
					<input type="radio" bind:group={type} value="goal" />
				</label>
			</div>

			<p>Index: {index}</p>

			<label>
				Letter
				<input type="text" maxlength="1" bind:value={letter} />
			</label>

			<label>
				X
				<input type="number" min={0} max={$grid.width} bind:value={x} />
			</label>
			<label>
				Y
				<input type="number" min={0} max={$grid.width} bind:value={y} />
			</label>

			<input type="submit" value="Add" />
		</form>

		<br />

		<button on:click={handleCopy}> Copy level to clipboard </button>
	</div>

	<span class="grid">
		<Grid {grid} />
	</span>
</main>

<style>
	main {
		position: absolute;
		min-width: 1000px;
		left: -200px;
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 2rem;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	.types {
		display: flex;
		flex-direction: column;
	}

	.grid {
		margin-top: 2rem;
		display: block;
		width: 100%;
		max-width: 400px;
		max-height: 400px;
	}
</style>
