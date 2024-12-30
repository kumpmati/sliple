/**
 * How big a gap can be until the fill operation fails
 */
export const MAX_GAP_ITERATIONS = 1000;

export const fill = <T>(
	arr: T[],
	compare: (prev: T, current: T) => boolean,
	fill: (prev: T) => T
) => {
	const filledArr: T[] = [];

	for (const item of arr) {
		if (filledArr.length > 0) {
			let n = 1;

			// add items to array until there isn't a gap any more
			while (compare(filledArr[filledArr.length - 1], item)) {
				filledArr.push(fill(filledArr[filledArr.length - 1]));
				n++;

				if (n >= MAX_GAP_ITERATIONS) {
					throw new Error('error: gap is too big');
				}
			}
		}

		filledArr.push(item);
	}

	return filledArr;
};
