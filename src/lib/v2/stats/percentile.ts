import type { V2Statistics } from '$lib/server/db/handlers/stats';
import { sum } from '$lib/utils/math';

/**
 * Calculates the percentile of the given moves in the given distribution.
 *
 * Formula: P = n/N * 100%
 * where P = percentile, n = number of datapoints under the given moves, N = total number of datapoints
 *
 * @returns percentage (0-100)
 */
export const calculatePercentile = (
	distribution: V2Statistics['distribution'],
	moves: number
): number => {
	const totalUnder = sum(
		distribution.filter((d) => d.value < moves).map((d) => d.count),
		0
	);
	const total = sum(distribution.map((d) => d.count));

	return (totalUnder / total) * 100;
};
