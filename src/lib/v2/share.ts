export const shareDailyPuzzle = (solution: string, maxMoves: number) => {
	return navigator.share({
		title: `Daily puzzle - ${new Date().toLocaleDateString()}`,
		url: 'https://sliple.app/play/daily',
		text: `Can you solve today's puzzle '${solution}' in ${maxMoves} moves?`
	});
};

export const shareRandomPuzzle = (id: string, solution: string, maxMoves: number) => {
	return navigator.share({
		title: `Random puzzle - '${solution}'`,
		url: `https://sliple.app/play/random/${id}`,
		text: `Can you solve this random puzzle '${solution}' in ${maxMoves} moves?`
	});
};
