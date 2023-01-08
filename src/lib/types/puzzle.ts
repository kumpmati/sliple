import type { Grid_v1, Grid_v2 } from './grid';

export type Puzzle_v1 = {
	id: string;

	/**
	 * This is the object that holds all the level information
	 */
	data: Grid_v1;

	/**
	 * Unix timestamp when the puzzle was published.
	 */
	publishedAt: Date;
};

export type Puzzle_v2 = {
	id: string;

	/**
	 * This is the object that holds all the level information
	 */
	data: Grid_v2;

	/**
	 * Unix timestamp when the puzzle was published.
	 */
	publishedAt: Date;

	/**
	 * What version is being used
	 */
	version: string;
};
