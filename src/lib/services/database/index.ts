import { DB_URI } from '$env/static/private';
import type { Puzzle_v2 } from '$lib/types/puzzle';
import mongoose from 'mongoose';
import { PuzzleModel_v1 } from '../../schemas/puzzle';

/**
 * Connects to the database if not already connected
 */
export const connectDB = async () => {
	if (mongoose.connection.readyState === 0) {
		console.log('connecting to database');
		await mongoose.connect(DB_URI);
	}
};

export const getAllPuzzles = async (): Promise<Puzzle_v2[]> => {
	const ps = await PuzzleModel_v1.find({}).sort({ publishedAt: -1 }).exec();
	return ps.map((p) => p.toObject());
};

export const getLatestPuzzle = async (): Promise<Puzzle_v2 | null> => {
	const p = await PuzzleModel_v1.findOne({}).sort({ publishedAt: -1 }).exec();
	if (!p) return null;

	return p.toObject();
};

export const getPuzzleById = async (id: string): Promise<Puzzle_v2 | null> => {
	const p = await PuzzleModel_v1.findOne({ id }).exec();
	if (!p) return null;

	return p.toObject();
};
