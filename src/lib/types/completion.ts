export type PuzzleCompletion = {
	id: string;
	type: 'w' | 'l';
	puzzleId: string;
	numMoves: number;
	createdAt: Date;
	updatedAt: Date;
};
