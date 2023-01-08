import { z } from 'zod';

export const tileSchema = z.object({
	type: z.string(),
	id: z.string(),
	x: z.number().min(0).max(10),
	y: z.number().min(0).max(10),
	letter: z.string().optional(),
	index: z.number().min(0).optional()
});

export const gridSchema_v1 = z.object({
	width: z.number().min(1).max(10),
	height: z.number().min(1).max(10),
	numMovesTaken: z.number().min(0),
	maxMoves: z.number().min(1).max(100),
	mode: z.string().max(11),
	solutions: z.array(z.string()),
	tiles: z.array(tileSchema)
});

export const gridSchema_v2 = z.object({
	width: z.number().min(1).max(10),
	height: z.number().min(1).max(10),
	numMovesTaken: z.number().min(0),
	maxMoves: z.object({
		gold: z.number().min(0),
		silver: z.number().min(0).nullable(),
		bronze: z.number().min(0).nullable()
	}),
	mode: z.string().max(11),
	solution: z.string(),
	tiles: z.array(tileSchema)
});

export type Grid_v1 = {
	width: number;
	height: number;
	numMovesTaken: number;
	maxMoves: number;
	mode: 'freestyle' | 'predefined';
	solutions: string[];
	tiles: Tile[];
};

export type Grid_v2 = {
	width: number;
	height: number;
	numMovesTaken: number;
	maxMoves: {
		gold: number;
		silver: number | null;
		bronze: number | null;
	};
	solution: string;
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
