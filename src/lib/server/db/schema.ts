import { index, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const puzzleCompletionTable = pgTable(
	'puzzle_completions',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		userId: text('user_id'),
		puzzleId: text('puzzle_id').notNull(),
		numMoves: integer('num_moves').notNull(),
		country: text('country').notNull().default('XX'),
		attempts: integer('attempts').notNull().default(1),
		timestamp: timestamp('timestamp', { withTimezone: true }).notNull().defaultNow()
	},
	(table) => ({
		puzzleIdIndex: index('puzzle_completion_puzzle_id_index').on(table.puzzleId),
		idAndUserIdIndex: index('puzzle_completion_id_and_user_id_index').on(
			table.puzzleId,
			table.userId
		)
	})
);

export type PostgresPuzzleCompletionInsert = typeof puzzleCompletionTable.$inferInsert;
export type PostgresPuzzleCompletion = typeof puzzleCompletionTable.$inferSelect;

export const puzzleSolutionTable = pgTable('puzzle_solutions', {
	puzzleId: text('puzzle_id').primaryKey(),
	optimalSolution: integer('optimal_solution').notNull(),
	calculationTimeMs: integer('calculation_time_ms').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

export type PuzzleSolutionInsert = typeof puzzleSolutionTable.$inferInsert;
export type PuzzleSolution = typeof puzzleSolutionTable.$inferSelect;
