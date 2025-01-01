DROP INDEX IF EXISTS "puzzle_completion_type_index";--> statement-breakpoint
ALTER TABLE "puzzle_completions" DROP COLUMN IF EXISTS "type";