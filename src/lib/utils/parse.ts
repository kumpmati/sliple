import type { WallTile, LetterTile, StickyTile, GoalTile } from '$lib/types/grid';
import { nanoid } from 'nanoid';

export const createWall = (x: number, y: number): WallTile => ({
	id: nanoid(),
	type: 'wall',
	x,
	y
});

export const createSticky = (x: number, y: number): StickyTile => ({
	id: nanoid(),
	type: 'sticky',
	x,
	y
});

export const createLetter = (x: number, y: number, letter: string): LetterTile => ({
	id: nanoid(),
	type: 'letter',
	letter,
	x,
	y
});

export const createGoal = (x: number, y: number, [letter, index]: [string, string]): GoalTile => ({
	id: nanoid(),
	type: 'goal',
	letter: letter,
	index: parseInt(index) ?? 0,
	x,
	y
});
