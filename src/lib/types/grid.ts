export type Grid = {
	width: number;
	height: number;
	blocks: Block[];
};

export interface Block {
	type: string;
	id: string;
	x: number;
	y: number;
}

export interface LetterBlock extends Block {
	type: 'letter';
	letter: string; // Letter
}

export interface WallBlock extends Block {
	type: 'wall';
}

export interface GoalBlock extends Block {
	type: 'goal';
	required: boolean;
	index: number;
}

export interface StickyBlock extends Block {
	type: 'sticky';
}
