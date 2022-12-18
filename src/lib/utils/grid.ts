import type { Direction } from '$lib/stores/grid';
import type { Block, Grid } from '$lib/types/grid';
import { clamp } from './math';

type Pos = {
	x: number;
	y: number;
};

/**
 * calculateNextPosition gets the grid, a block ID and a direction as the input,
 * and calculates the ending position for that block when moved in the direction.
 * It takes into account all the encountered block types, like walls and sticky blocks.
 * @param grid
 * @param blockId
 * @param direction
 * @returns
 */
export const calculateNextPosition = (
	grid: Grid,
	blockId: string,
	direction: Direction
): Pos | null => {
	const curr = grid.blocks.find((b) => b.id === blockId);
	const blocks = grid.blocks.filter((b) => b.id !== blockId);
	if (!curr) return null;

	let x = curr.x;
	let y = curr.y;
	const offset = getOffsets(direction);

	let n = Math.max(grid.width, grid.height);
	while (n-- >= 0) {
		// increment the x and y by their offsets, and
		// also clamp them to the grid's size
		x = clamp(x + offset.x, 0, grid.width - 1);
		y = clamp(y + offset.y, 0, grid.height - 1);

		const found = blocks.find((b) => b.x === x && b.y === y);
		if (!found) continue; // empty tile, continue

		switch (found.type) {
			case 'goal': {
				continue;
			}

			case 'sticky': {
				return { x: found.x, y: found.y };
			}

			case 'wall':
			default: {
				return { x: found.x - offset.x, y: found.y - offset.y };
			}
		}
	}

	return { x, y };
};

export const canMove = (block: Block) => block.type === 'letter';

const getOffsets = (dir: Direction): Pos => {
	switch (dir) {
		case 'bottom':
			return { x: 0, y: 1 };
		case 'top':
			return { x: 0, y: -1 };
		case 'left':
			return { x: -1, y: 0 };
		case 'right':
			return { x: 1, y: 0 };
		default:
			return { x: 0, y: 0 };
	}
};
