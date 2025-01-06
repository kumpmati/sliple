ALTER TABLE "puzzle_completions" ADD COLUMN "user_id" text;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "puzzle_completion_user_id_index" ON "puzzle_completions" USING btree ("user_id");