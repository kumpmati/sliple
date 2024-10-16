export const markCompletion = async (puzzleId: string, type: 'w' | 'l', numMoves: number) => {
	return fetch('/api/completion', {
		method: 'POST',
		body: JSON.stringify({ puzzleId, type, numMoves })
	}).then((d) => d.json());
};
