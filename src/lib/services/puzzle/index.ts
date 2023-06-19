import {
	SavedPuzzleModel,
	type SavedPuzzle,
	type PuzzleStats,
	PuzzleStatsModel,
	type PuzzleCompletion
} from '$lib/schemas/puzzle';
import type { AuthUser } from '../auth';
import { getUserById } from '../auth/handlers';

export const getAllSavedPuzzlesForUser = async (userId: string): Promise<SavedPuzzle[]> => {
	return (await SavedPuzzleModel.find({ userId }).exec()).map((item) => item.toJSON());
};

export const getSavedPuzzleForUser = async (
	userId: string,
	puzzleId: string
): Promise<SavedPuzzle | null> => {
	return (await SavedPuzzleModel.findOne({ userId, puzzleId }))?.toObject() ?? null;
};

export const savePuzzleForUser = async (data: SavedPuzzle): Promise<SavedPuzzle> => {
	return await new SavedPuzzleModel(data).save();
};

export const unsavePuzzleForUser = async (userId: string, puzzleId: string) => {
	return await SavedPuzzleModel.findOneAndDelete({ userId, puzzleId }).exec();
};

/**
 * Adds an entry to the completions of a single puzzle.
 * @param puzzleId
 * @param data
 * @returns
 */
export const addPuzzleCompletion = async (
	puzzleId: string,
	data: PuzzleStats['completions'][number]
) => {
	const existing = await PuzzleStatsModel.findOne({ puzzleId });
	if (existing) {
		return (
			(
				await PuzzleStatsModel.findOneAndUpdate(
					{ puzzleId },
					{ $push: { completions: data } },
					{ upsert: true }
				)
			)?.toObject() ?? null
		);
	}

	return (await new PuzzleStatsModel({ puzzleId, completions: [data] }).save()).toObject() ?? null;
};

export const getPuzzleCompletion = async (puzzleId: string): Promise<PuzzleStats | null> => {
	return (await PuzzleStatsModel.findOne({ puzzleId }))?.toObject() ?? null;
};

export const getPuzzleTop5 = async (
	puzzleId: string
): Promise<(PuzzleCompletion & { user: AuthUser | null })[] | null> => {
	const stats = await getPuzzleCompletion(puzzleId);
	if (!stats) return null;

	const sorted = stats.completions
		.filter((c) => c.userId && c.result === 'w')
		.sort((a, b) => {
			// favour the earliest timestamp if equal moves
			if (a.moves === b.moves) return a.timestamp - b.timestamp;

			// otherwise sort by moves
			return a.moves - b.moves;
		});

	const users = new Set();

	const uniqueSorted = sorted.filter((item) => {
		if (!users.has(item.userId)) {
			users.add(item.userId);
			return true;
		}

		return false;
	});

	return await Promise.all(
		uniqueSorted.map(async (s) => ({
			...s,
			user: s.userId
				? await getUserById(s.userId!).then((d) => {
						console.log(s.userId, d);
						return d;
				  })
				: null
		}))
	);
};
