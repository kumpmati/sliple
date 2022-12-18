import type { GoalBlock, LetterBlock, StickyBlock, Tile, WallBlock } from '$lib/types/grid';

export const isLetterTile = (t: Tile): t is LetterBlock => t.type === 'letter';
export const isWallTile = (t: Tile): t is WallBlock => t.type === 'wall';
export const isGoalTile = (t: Tile): t is GoalBlock => t.type === 'goal';
export const isStickyTile = (t: Tile): t is StickyBlock => t.type === 'sticky';
