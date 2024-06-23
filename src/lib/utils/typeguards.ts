import type {
	DirectionTile,
	GoalTile,
	LetterTile,
	StickyTile,
	Tile,
	WallTile
} from '$lib/types/grid';

export const isLetterTile = (t: Tile): t is LetterTile => t.type === 'letter' || t.type === 'l';
export const isWallTile = (t: Tile): t is WallTile => t.type === 'wall' || t.type === 'w';
export const isGoalTile = (t: Tile): t is GoalTile => t.type === 'goal' || t.type === 'g';
export const isStickyTile = (t: Tile): t is StickyTile => t.type === 'sticky' || t.type === 's';
export const isDirectionTile = (t: Tile): t is DirectionTile =>
	t.type === 'direction' || t.type === 'd';
