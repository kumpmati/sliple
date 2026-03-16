CREATE TABLE IF NOT EXISTS "puzzle_solutions" (
	"puzzle_id" text PRIMARY KEY NOT NULL,
	"optimal_solution" integer NOT NULL,
	"calculation_time_ms" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
