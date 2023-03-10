import type { Grid } from './grid';

export type Puzzle = {
	id: string;

	/**
	 * This is the object that holds all the level information
	 */
	data: Grid;

	/**
	 * Unix timestamp when the puzzle was published.
	 */
	publishedAt: Date;

	/**
	 * What version is being used
	 */
	version: string;
};

export type FinishEvent = {
	type: 'win' | 'loss';
	moves: number;
};
