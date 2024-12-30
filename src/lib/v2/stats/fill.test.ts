import { describe, expect, it } from 'vitest';
import { fill } from './fill';

describe('fill', () => {
	const compareFunc = (a: number, b: number) => b - a > 1;
	const fillFunc = (last: number) => last + 1;

	it('should do nothing when there are no gaps', () => {
		const before = [1, 2, 3, 4];
		const expected = [1, 2, 3, 4];

		expect(fill(before, compareFunc, fillFunc)).toEqual(expected);
	});

	it('should handle single-item gaps', () => {
		const before = [1, 2, 4, 5, 6];
		const expected = [1, 2, 3, 4, 5, 6];

		expect(fill(before, compareFunc, fillFunc)).toEqual(expected);
	});

	it('should handle multi-item gaps', () => {
		const before = [1, 2, 8, 9, 10, 13];
		const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

		expect(fill(before, compareFunc, fillFunc)).toEqual(expected);
	});

	it('should terminate on extremely big gaps', () => {
		expect(() => fill([1, 1001], compareFunc, fillFunc)).toThrow(
			new Error('error: gap is too big')
		);
	});
});
