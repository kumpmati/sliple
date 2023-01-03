import { z } from 'zod';

export type Grid = {
	width: number;
	height: number;
	numMovesTaken: number;
	maxMoves: number;
	mode: 'freestyle' | 'predefined';
	solutions: string[];
	tiles: Tile[];
};

export interface Tile {
	type: string;
	id: string;
	x: number;
	y: number;
}

export interface LetterTile extends Tile {
	type: 'letter';
	letter: string; // Letter
}

export interface WallTile extends Tile {
	type: 'wall';
}

export interface GoalTile extends Tile {
	type: 'goal';
	letter: string;
	index: number;
}

export interface StickyTile extends Tile {
	type: 'sticky';
}

export type Coordinates = {
	x: number;
	y: number;
};

export type CollisionType = 'none' | 'sticky' | 'solid';

export const tileSchema = z.object({
	type: z.string(),
	id: z.string(),
	x: z.number().min(0).max(10),
	y: z.number().min(0).max(10),
	letter: z.string().optional(),
	index: z.number().min(0).optional()
});

export const gridSchema = z.object({
	width: z.number().min(1).max(10),
	height: z.number().min(1).max(10),
	numMovesTaken: z.number().min(0),
	maxMoves: z.number().min(1).max(100),
	mode: z.string().max(11),
	solutions: z.array(z.string()),
	tiles: z.array(tileSchema)
});
