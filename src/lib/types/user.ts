export type UserState = {
	id: string;
	puzzles: Record<string, Puzzle>;
};

export type PuzzleStatus = 'none' | 'inprogress' | 'completed';
export type PuzzleRank = 'gold' | 'silver' | 'bronze';

type Puzzle = {
	id: string;
	status: 'none' | 'inprogress' | 'completed';
	rank: PuzzleRank | null;
};
