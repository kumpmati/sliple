import { db } from '$lib/server/db';
import { getPuzzleStatistics } from '$lib/server/db/handlers/stats';
import { puzzleCompletionTable } from '$lib/server/db/schema';
import { Dir } from '$lib/stores/grid';
import { getUidCookie } from '$lib/v2/cookies';
import { generateDailyPuzzle } from '$lib/v2/generate';
import { verifyPuzzleWin } from '$lib/v2/verify';
import { error } from '@sveltejs/kit';
import dayjs from 'dayjs';
import { and, eq } from 'drizzle-orm';
import { RateLimiter } from 'sveltekit-rate-limiter/server';
import { endpoint, zod } from 'sveltekit-superactions';
import { z } from 'zod';

const submitRateLimiter = new RateLimiter({
	IPUA: [30, 'm'] // IP Address + User Agent
});

const statsRateLimiter = new RateLimiter({
	IPUA: [60, 'm'] // IP Address + User Agent
});

const completionSchema = z.object({
	date: z.string().date(),
	moves: z
		.array(z.object({ tid: z.string().min(1).max(30), dir: z.nativeEnum(Dir) }))
		.min(1)
		.max(30)
});

export const POST = endpoint({
	markCompletion: zod(completionSchema, async (e, body) => {
		if (await submitRateLimiter.isLimited(e)) {
			error(429, { message: 'you are being rate limited, try again later' });
		}

		const uid = getUidCookie(e.cookies);
		if (!uid) error(401, "you haven't opted into global statistics");

		const date = new Date(body.date);

		if (Math.abs(dayjs().diff(date, 'days', true)) > 1) {
			error(400, 'puzzle is not accepting solutions');
		}

		const puzzle = generateDailyPuzzle(date);

		const verified = verifyPuzzleWin(puzzle, body.moves);
		if (verified.error) {
			error(400, verified.error);
		}

		const puzzleIdAndUserId = and(
			eq(puzzleCompletionTable.puzzleId, puzzle.id),
			eq(puzzleCompletionTable.userId, uid)
		);

		// TODO: maybe use transaction?
		const [existing] = await db.select().from(puzzleCompletionTable).where(puzzleIdAndUserId);
		if (!existing) {
			await db.insert(puzzleCompletionTable).values({
				puzzleId: puzzle.id,
				numMoves: verified.moves,
				userId: uid
			});

			return;
		}

		if (verified.moves < existing.numMoves) {
			await db
				.update(puzzleCompletionTable)
				.set({
					numMoves: verified.moves,
					timestamp: new Date(),
					attempts: existing.attempts + 1 // increase attempts
				})
				.where(puzzleIdAndUserId);

			return;
		}

		await db
			.update(puzzleCompletionTable)
			.set({ attempts: existing.attempts + 1 }) // increase attempts always
			.where(puzzleIdAndUserId);
	}),

	getv2Stats: zod(z.object({ puzzleId: z.string().min(1).max(64) }), async (e, body) => {
		if (await statsRateLimiter.isLimited(e)) {
			error(429, { message: 'you are being rate limited, try again later' });
		}

		return getPuzzleStatistics(body.puzzleId);
	})
});

export type StatsEndpoint = typeof POST;
