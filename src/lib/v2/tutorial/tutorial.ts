import type { Campaign } from '$lib/types/campaign';
import type { Puzzle } from '$lib/types/puzzle';

export type TutorialLevel = Pick<Puzzle, 'data' | 'id'> & { message: string; tip?: string };

export type Tutorial = {
	levels: TutorialLevel[];
};

export const tutorial: Tutorial = {
	levels: [
		{
			id: 't1',
			message: 'Move letter tiles by quickly swiping them with your finger (or mouse cursor).',
			tip: 'Note: The tiles are slippery, and will only stop sliding when they hit the level edge, another tile or a wall.',
			data: {
				width: 3,
				height: 1,
				maxMoves: { gold: 1, silver: 1, bronze: 1 },
				numMovesTaken: 0,
				solution: 'a',
				tiles: [
					{ id: 'g:0', type: 'goal', letter: 'a', index: 0, x: 2, y: 0 },
					{ id: 'l:0', type: 'letter', letter: 'a', x: 0, y: 0 }
				]
			}
		},
		{
			id: 't2',
			message: 'To complete a puzzle, all letters must be at their goals at the same time.',
			data: {
				width: 3,
				height: 2,
				maxMoves: { gold: 2, silver: 2, bronze: 2 },
				numMovesTaken: 0,
				solution: 'he',
				tiles: [
					{ id: 'g:0', type: 'goal', letter: 'h', index: 0, x: 2, y: 0 },
					{ id: 'g:1', type: 'goal', letter: 'e', index: 1, x: 0, y: 1 },
					{ id: 'l:1', type: 'letter', letter: 'h', x: 0, y: 0 },
					{ id: 'l:2', type: 'letter', letter: 'e', x: 2, y: 1 }
				]
			}
		},
		{
			id: 't3',
			message:
				'Order matters! Often times a tile needs to collide with another tile to reach its goal.',
			tip: 'Tip: You can complete this puzzle in either 3 or 4 moves.',
			data: {
				width: 3,
				height: 3,
				maxMoves: { gold: 3, silver: 4, bronze: 4 },
				numMovesTaken: 0,
				solution: 'ox',
				tiles: [
					{ id: 'g:0', type: 'goal', letter: 'o', index: 0, x: 2, y: 1 },
					{ id: 'g:1', type: 'goal', letter: 'x', index: 1, x: 0, y: 2 },
					{ id: 'l:0', type: 'letter', letter: 'o', x: 0, y: 0 },
					{ id: 'l:1', type: 'letter', letter: 'x', x: 1, y: 2 }
				]
			}
		},
		{
			id: 't4',
			message:
				'Sometimes puzzles can have walls. You cannot move walls, but tiles will collide with them.',
			data: {
				width: 3,
				height: 3,
				maxMoves: { gold: 3, silver: 3, bronze: 3 },
				numMovesTaken: 0,
				solution: 'f',
				tiles: [
					{ id: 'w:0', type: 'wall', x: 2, y: 0 },
					{ id: 'g:0', type: 'goal', letter: 'f', index: 0, x: 1, y: 2 },
					{ id: 'l:0', type: 'letter', letter: 'f', x: 0, y: 0 }
				]
			}
		}
	]
};
