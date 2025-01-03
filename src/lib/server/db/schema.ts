import { index, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const puzzleCompletionTable = pgTable(
	'puzzle_completions',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		userId: text('user_id'),
		puzzleId: text('puzzle_id').notNull(),
		numMoves: integer('num_moves').notNull(),
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
