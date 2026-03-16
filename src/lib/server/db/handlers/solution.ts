import { eq } from 'drizzle-orm';
import { db } from '..';
import { puzzleSolutionTable, type PuzzleSolution, type PuzzleSolutionInsert } from '../schema';

export const getPuzzleSolution = async (puzzleId: string): Promise<PuzzleSolution | null> => {
	const rows = await db
		.select()
		.from(puzzleSolutionTable)
		.where(eq(puzzleSolutionTable.puzzleId, puzzleId))
		.limit(1);

	return rows.at(0) ?? null;
};

export const insertPuzzleSolution = async (body: PuzzleSolutionInsert) => {
	await db.insert(puzzleSolutionTable).values(body);
};
