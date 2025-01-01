import { index, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const puzzleCompletionTable = pgTable(
	'puzzle_completions',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		puzzleId: text('puzzle_id').notNull(),
		numMoves: integer('num_moves').notNull(),
		timestamp: timestamp('timestamp', { withTimezone: true }).notNull().defaultNow()
	},
	(table) => ({
		puzzleIdIndex: index('puzzle_completion_puzzle_id_index').on(table.puzzleId),
		timestampIndex: index('puzzle_completion_timestamp_index').on(table.timestamp)
	})
);

export type PostgresPuzzleCompletionInsert = typeof puzzleCompletionTable.$inferInsert;
export type PostgresPuzzleCompletion = typeof puzzleCompletionTable.$inferSelect;
