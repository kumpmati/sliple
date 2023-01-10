import { DB_URI } from '$env/static/private';
import { CampaignModel } from '$lib/schemas/campaign';
import type { Campaign } from '$lib/types/campaign';
import type { Puzzle } from '$lib/types/puzzle';
import mongoose from 'mongoose';
import { PuzzleModel } from '../../schemas/puzzle';

/**
 * Connects to the database if not already connected
 */
export const connectDB = async () => {
	if (mongoose.connection.readyState === 0) {
		console.log('connecting to database');
		await mongoose.connect(DB_URI);
	}
};

export const getAllPuzzles = async (): Promise<Puzzle[]> => {
	const ps = await PuzzleModel.find({}).sort({ publishedAt: -1 }).exec();
	return ps.map((p) => p.toObject());
};

export const getLatestPuzzle = async (): Promise<Puzzle | null> => {
	const p = await PuzzleModel.findOne({}).sort({ publishedAt: -1 }).exec();
	if (!p) return null;

	return p.toObject();
};

export const getPuzzleById = async (id: string): Promise<Puzzle | null> => {
	const p = await PuzzleModel.findOne({ id }).exec();
	if (!p) return null;

	return p.toObject();
};

export const getAllCampaigns = async (): Promise<Campaign[]> => {
	const cs = await CampaignModel.find({}).sort({ publishedAt: -1 }).exec();
	return cs.map((c) => c.toObject());
};

export const getCampaignById = async (id: string): Promise<Campaign | null> => {
	const c = await CampaignModel.findOne({ id }).exec();
	if (!c) return null;

	return c.toObject();
};

export const updateCampaign = async (
	id: string,
	body: Partial<Campaign>
): Promise<Campaign | null> => {
	const c = await CampaignModel.findOneAndUpdate({ id }, body).exec();
	if (!c) return null;

	return c.toObject();
};
