import type { Tile } from '$lib/types/grid';
import type { Puzzle } from '$lib/types/puzzle';

const serializeTile = <T extends Tile>(t: T): any[] => {
	const { id, type, x, y, ...rest } = t;
	return [id, type, x, y, rest];
};

const deserializeTile = <T extends Tile>(parts: any[]): T => {
	const [id, type, x, y, rest] = parts;
	return { id, type, x, y, ...rest };
};

/**
 * Converts a puzzle to an URL-safe shareable code.
 * @param p puzzle to convert
 * @returns Share code
 */
export const toShareCode = (p: Puzzle): string => {
	const data = [
		p.data.width,
		p.data.height,
		[p.data.maxMoves.bronze, p.data.maxMoves.silver, p.data.maxMoves.gold],
		p.data.solution,
		p.data.tiles.map(serializeTile)
	];

	return btoa(JSON.stringify([p.version, p.id, p.publishedAt, data]));
};

/**
 * Converts a shareable code to a valid puzzle level.
 * @param code Share code
 * @throws if the conversion fails
 * @returns Puzzle
 */
export const fromShareCode = (code: string): Puzzle => {
	try {
		const [version, id, publishedAt, rawData] = JSON.parse(atob(code));
		const [width, height, [bronze, silver, gold], solution, tiles] = rawData;

		return {
			version,
			id,
			publishedAt,
			data: {
				width,
				height,
				maxMoves: { bronze, silver, gold },
				numMovesTaken: 0,
				solution,
				tiles: tiles.map(deserializeTile)
			}
		};
	} catch (err) {
		throw new Error('Invalid share code');
	}
};
