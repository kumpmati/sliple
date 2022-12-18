export type Grid = {
	width: number;
	height: number;
	numMovesTaken: number;
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
	required: boolean;
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
