import { mapToRange } from '$lib/utils/math';
import type seedrandom from 'seedrandom';

export type TilePos = {
	x: number;
	y: number;
};

// prevents infinite loops
const MAX_TRIES = 20;

/**
 *
 * @param seed Random seed
 * @param amount How many positions to generate
 * @param existingPositions Array of already filled positions that shouldn't be filled
 * @returns
 */
export const generateUniqueTilePositions = (
	rnd: seedrandom.PRNG,
	amount: number,
	settings: { width: number; height: number },
	existingPositions: TilePos[] = []
): TilePos[] => {
	const positions: TilePos[] = [];

	for (let i = 0; i < amount; i++) {
		let x = Math.round(mapToRange(rnd.double(), 0, 1, 0, settings.width - 1));
		let y = Math.round(mapToRange(rnd.double(), 0, 1, 0, settings.height - 1));

		let tries = 0;

		// regenerate until a spot that doesn't have a tile is found
		while (
			tries < MAX_TRIES &&
			(existingPositions.find((t) => t.x === x && t.y === y) ||
				positions.find((t) => t.x === x && t.y === y))
		) {
			x = Math.round(mapToRange(rnd.double(), 0, 1, 0, settings.width - 1));
			y = Math.round(mapToRange(rnd.double(), 0, 1, 0, settings.height - 1));
		}

		tries++;

		if (tries >= MAX_TRIES) throw new Error('Not enough room for all tiles');

		positions.push({ x, y });
	}

	return positions;
};
