import { clamp } from '$lib/utils/math';

/**
 * Maps the given value to a range of 0..1 based on the given min and max.
 * @param val value to map
 * @param min smallest value in the range
 * @param max largest value in the range
 * @returns
 */
export const normalise = (val: number, min: number, max: number): number => {
	return clamp((val - min) / (max - min), 0, 1);
};
