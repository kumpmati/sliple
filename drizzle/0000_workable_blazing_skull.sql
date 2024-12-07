CREATE TABLE IF NOT EXISTS "puzzle_completions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"puzzle_id" text NOT NULL,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL
);
