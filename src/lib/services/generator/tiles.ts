import { mapToRange } from '$lib/utils/math';
import { alea } from 'seedrandom';

type TilePos = {
	x: number;
	y: number;
};

// prevents infinite loops
const MAX_TRIES = 20;

/**
 *
 * @param seed Random seed
 * @param amount How many positions to generate
 * @param existingTiles Array of already filled positions that shouldn't be filled
 * @returns
 */
export const generateUniqueTilePositions = (
	seed: string,
	amount: number,
	settings: { width: number; height: number },
	existingTiles: TilePos[]
): TilePos[] => {
	const rnd = alea(seed);

	const tiles: TilePos[] = [];

	for (let i = 0; i < amount; i++) {
		let x = Math.floor(mapToRange(rnd.double(), 0, 1, 0, settings.width - 1));
		let y = Math.floor(mapToRange(rnd.double(), 0, 1, 0, settings.height - 1));

		let tries = 0;

		// regenerate until a spot that doesn't have a tile is found
		while (
			tries < MAX_TRIES &&
			(existingTiles.find((t) => t.x === x && t.y === y) ||
				tiles.find((t) => t.x === x && t.y === y))
		) {
			x = Math.round(mapToRange(rnd.double(), 0, 1, 0, settings.width - 1));
			y = Math.round(mapToRange(rnd.double(), 0, 1, 0, settings.height - 1));
		}

		tries++;

		if (tries >= MAX_TRIES) throw new Error('Not enough room for all tiles');

		tiles.push({ x, y });
	}

	return tiles;
};
