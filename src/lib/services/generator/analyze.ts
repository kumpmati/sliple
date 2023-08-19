import type { LetterTile } from '$lib/types/grid';
import type { Puzzle } from '$lib/types/puzzle';
import { sum } from '$lib/utils/math';
import { isGoalTile, isLetterTile } from '$lib/utils/typeguards';

export type PuzzleAnalysisData = {
	minRequiredMoves: number;
};

/**
 * Calculates the number of moves required to move the given tile to its goal.
 */
const calculateTileMoves = (p: Puzzle, tile: LetterTile): number => {
	let num = 0;

	const goalTile = p.data.tiles.find((t) => isGoalTile(t) && t.letter === tile.letter);

	if (goalTile) {
		if (tile.x !== goalTile.x) num++;
		if (tile.y !== goalTile.y) num++;
	}

	return num;
};

/**
 * Analyzes a puzzle and gives some stats, such as minimum number of moves to complete.
 */
export const analyzePuzzle = (p: Puzzle): PuzzleAnalysisData => {
	const letterTiles = p.data.tiles.filter(isLetterTile);

	const minRequiredMoves = sum(letterTiles.map((lt) => calculateTileMoves(p, lt)));

	return {
		minRequiredMoves
	};
};
