import { DB_URI } from '$env/static/private';
import { addTieredScore } from '$lib/migrations/addTieredScore';
import type { Puzzle_v2 } from '$lib/types/puzzle';
import mongoose from 'mongoose';
import { PuzzleModel_v1, PuzzleModel_v2 } from '../../schemas/puzzle';

/**
 * Connects to the database if not already connected
 */
export const connectDB = async () => {
	if (mongoose.connection.readyState === 0) {
		console.log('connecting to database');
		await mongoose.connect(DB_URI);

		await migrate();
	}
};

export const migrate = async () => {
	console.log('running migrations');
	await migrate_v1_v2();
	console.log('migrations done');
};

const migrate_v1_v2 = async () => {
	console.log('migration: v1 -> v2');
	const updated: string[] = [];
	const failed: string[] = [];

	const oldPuzzles = await PuzzleModel_v1.find({}).exec();
	const found = oldPuzzles.length;

	await Promise.all(
		oldPuzzles.map(async (p) => {
			try {
				const newPuzzle = addTieredScore.up(p);
				const p2 = new PuzzleModel_v2(newPuzzle);
				await p2.save(); // save new one
				await p.delete(); // delete old one

				updated.push(p2.id);
			} catch (e) {
				failed.push(p.id);
				return null;
			}
		})
	);

	console.log('found:', found);
	console.log('updated:', updated.length);
	console.log('failed:', failed);
};

export const getAllPuzzles = async (): Promise<Puzzle_v2[]> => {
	const ps = await PuzzleModel_v2.find({}).sort({ publishedAt: -1 }).exec();
	return ps.map((p) => p.toObject());
};

export const getLatestPuzzle = async (): Promise<Puzzle_v2 | null> => {
	const p = await PuzzleModel_v2.findOne({}).sort({ publishedAt: -1 }).exec();
	if (!p) return null;

	return p.toObject();
};

export const getPuzzleById = async (id: string): Promise<Puzzle_v2 | null> => {
	const p = await PuzzleModel_v2.findOne({ id }).exec();
	if (!p) return null;

	return p.toObject();
};
