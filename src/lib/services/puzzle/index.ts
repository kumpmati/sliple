import { SavedPuzzleModel, type SavedPuzzle } from '$lib/schemas/puzzle';

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
