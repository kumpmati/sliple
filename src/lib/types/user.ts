export type UserState = {
	id: string;
	puzzles: Record<string, Puzzle>;
};

export type PuzzleStatus = 'none' | 'inprogress' | 'completed';

type Puzzle = {
	id: string;
	status: 'none' | 'inprogress' | 'completed';
};
