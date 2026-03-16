import type { Grid, LetterTile } from '$lib/types/grid';
import { describe, expect, it } from 'vitest';
import { getAllPossibleMoves } from './grid';
import { Dir } from '$lib/stores/grid';

describe('getAllPossibleMoves', () => {
	it('returns empty when there are no possible moves', () => {
		const g = {
			width: 1,
			height: 1,
			tiles: [{ type: 'letter', id: 'a', letter: 'a', x: 0, y: 0 } satisfies LetterTile]
		} as Grid;

		expect(getAllPossibleMoves(g)).toMatchObject([]);
	});

	it('returns all possible moves for one tile', () => {
		const g = {
			width: 3,
			height: 2,
			tiles: [{ type: 'letter', id: 'a', letter: 'A', x: 1, y: 0 } satisfies LetterTile]
		} as Grid;

		expect(getAllPossibleMoves(g)).toMatchObject([
			{ id: 'a', dir: Dir.DOWN },
			{ id: 'a', dir: Dir.LEFT },
			{ id: 'a', dir: Dir.RIGHT }
		]);
	});

	it('returns all possible moves for two tiles', () => {
		const g = {
			width: 3,
			height: 2,
			tiles: [
				{ type: 'letter', id: 'a', letter: 'A', x: 1, y: 0 } satisfies LetterTile,
				{ type: 'letter', id: 'b', letter: 'B', x: 0, y: 1 } satisfies LetterTile
			]
		} as Grid;

		expect(getAllPossibleMoves(g)).toMatchObject([
			{ id: 'a', dir: Dir.DOWN },
			{ id: 'a', dir: Dir.LEFT },
			{ id: 'a', dir: Dir.RIGHT },

			{ id: 'b', dir: Dir.UP },
			{ id: 'b', dir: Dir.RIGHT }
		]);
	});

	it('returns all possible moves for three tiles', () => {
		// puzzle shape:
		// -AC
		// B--
		const g = {
			width: 3,
			height: 2,
			tiles: [
				{ type: 'letter', id: 'a', letter: 'A', x: 1, y: 0 } satisfies LetterTile,
				{ type: 'letter', id: 'b', letter: 'B', x: 0, y: 1 } satisfies LetterTile,
				{ type: 'letter', id: 'c', letter: 'C', x: 2, y: 0 } satisfies LetterTile
			]
		} as Grid;

		expect(getAllPossibleMoves(g)).toMatchObject([
			{ id: 'a', dir: Dir.DOWN },
			{ id: 'a', dir: Dir.LEFT },

			{ id: 'b', dir: Dir.UP },
			{ id: 'b', dir: Dir.RIGHT },

			{ id: 'c', dir: Dir.DOWN }
		]);
	});
});
