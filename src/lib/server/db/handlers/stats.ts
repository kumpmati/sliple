import { sql, count, and, eq, asc } from 'drizzle-orm';
import { puzzleCompletionTable } from '../schema';
import { db } from '..';

export const getPuzzleStatistics = async (puzzleId: string): Promise<V2Statistics> => {
	const [totals, distribution] = await Promise.all([
		db
			.select({
				averageMoves: sql<number>`cast(avg(${puzzleCompletionTable.numMoves}) as float)`,
				totalAttempts: count(puzzleCompletionTable)
			})
			.from(puzzleCompletionTable)
			.where(and(eq(puzzleCompletionTable.puzzleId, puzzleId)))
			.groupBy(puzzleCompletionTable.puzzleId),
		db
			.select({
				value: puzzleCompletionTable.numMoves,
				count: count(puzzleCompletionTable)
			})
			.from(puzzleCompletionTable)
			.where(and(eq(puzzleCompletionTable.puzzleId, puzzleId), eq(puzzleCompletionTable.type, 'w')))
			.groupBy(puzzleCompletionTable.numMoves)
			.orderBy(asc(puzzleCompletionTable.numMoves))
	]);

	return {
		distribution,
		totals: totals.at(0) ?? { averageMoves: 0, totalAttempts: 0 }
	} satisfies V2Statistics;
};

export type V2Statistics = {
	distribution: { value: number; count: number }[];
	totals: {
		averageMoves: number;
		totalAttempts: number;
	};
};
