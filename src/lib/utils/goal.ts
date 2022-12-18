import type { GoalTile, LetterTile } from '$lib/types/grid';

export const getGoalStatus = (
	goal: GoalTile | null,
	tile: LetterTile | null
): 'valid' | 'invalid' | 'none' => {
	if (!tile || !goal) return 'none';
	if (!goal.letter) return 'valid';
	if (goal.letter.toUpperCase() === tile.letter.toUpperCase()) return 'valid';
	return 'invalid';
};
