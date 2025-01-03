export enum EndType {
	LOSS = 0,
	WIN = 1
}

export enum PuzzleType {
	DAILY = 0,
	RANDOM = 1
}

export type CompletionDetails = {
	endType: EndType;
	moves: number;
	timestamp: Date;
};

export type CompletionEntry = {
	puzzleType: PuzzleType;
	puzzleId: string;
	timestamp: Date;
	best: CompletionDetails | null;
	latest: CompletionDetails | null;
};
