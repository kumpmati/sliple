export type UserState = {
	id: string;
	puzzles: Record<string, PuzzleState>;
};

export type CompletionStatus = 'none' | 'inprogress' | 'completed';
export type CompletionRank = 'gold' | 'silver' | 'bronze';

type PuzzleState = {
	id: string;
	campaignId?: string;
	status: CompletionStatus;
	rank: CompletionRank | null;
};
