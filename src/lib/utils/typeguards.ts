import type { GoalTile, LetterTile, StickyTile, Tile, WallTile } from '$lib/types/grid';

export const isLetterTile = (t: Tile): t is LetterTile => t.type === 'letter';
export const isWallTile = (t: Tile): t is WallTile => t.type === 'wall';
export const isGoalTile = (t: Tile): t is GoalTile => t.type === 'goal';
export const isStickyTile = (t: Tile): t is StickyTile => t.type === 'sticky';
