import type { Puzzle } from '$lib/types/puzzle';

export type GeneratorConstraints = {
	words: string[];
	maxLength?: number;
	minLength?: number;
};

export interface PuzzleGenerator {
	generate: (seed: string, constraints: GeneratorConstraints) => Puzzle;
}
