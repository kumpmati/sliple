import type { PuzzleStats } from '../../routes/api/stats/[id]/+server';

export const markCompletion = async (puzzleId: string, type: 'w' | 'l', numMoves: number) => {
	return fetch('/api/completion', {
		method: 'POST',
		body: JSON.stringify({ puzzleId, type, numMoves })
	}).then((d) => d.json());
};

export const getPuzzleStats = async (puzzleId: string): Promise<PuzzleStats | null> => {
	const response = await fetch('/api/stats/' + puzzleId);

	if (!response.ok) {
		return null;
	}

	return response.json();
};
