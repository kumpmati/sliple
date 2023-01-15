import type { Direction } from '$lib/stores/grid';
import { z } from 'zod';

export const tileSchema = z.object({
	type: z.string(),
	id: z.string(),
	x: z.number().min(0).max(10),
	y: z.number().min(0).max(10),
	letter: z.string().optional(),
	index: z.number().min(0).optional(),
	dircetion: z.string().optional()
});

export const gridSchema = z.object({
	width: z.number().min(1).max(10),
	height: z.number().min(1).max(10),
	numMovesTaken: z.number().min(0),
	maxMoves: z.object({
		gold: z.number().min(0),
		silver: z.number().min(0),
		bronze: z.number().min(0)
	}),
	solution: z.string(),
	tiles: z.array(tileSchema)
});

export type Grid = z.infer<typeof gridSchema>;

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

export interface DirectionTile extends Tile {
	type: 'direction';
	direction: Direction;
}

export type Coordinates = {
	x: number;
	y: number;
};

export type CollisionType = 'none' | 'sticky' | 'solid';
