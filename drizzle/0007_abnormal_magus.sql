DROP INDEX IF EXISTS "puzzle_completion_timestamp_index";--> statement-breakpoint
DROP INDEX IF EXISTS "puzzle_completion_user_id_index";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "puzzle_completion_id_and_user_id_index" ON "puzzle_completions" USING btree ("puzzle_id","user_id");