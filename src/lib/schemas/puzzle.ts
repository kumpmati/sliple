import type { Puzzle } from '$lib/types/puzzle';
import mongoose, { Schema } from 'mongoose';

export const PuzzleModel =
	mongoose?.models?.puzzle_v2 ??
	mongoose.model(
		'puzzle_v2',
		new Schema<Puzzle>(
			{
				id: String,
				data: Schema.Types.Mixed,
				publishedAt: Date,
				version: String
			},
			{
				timestamps: true,
				toJSON: {
					transform: (_, ret) => {
						delete ret._id;
					}
				},
				toObject: {
					transform: (_, ret) => {
						delete ret._id;
					}
				}
			}
		)
	);

/**
 * Contains all the saved puzzles for a user
 */
export const SavedPuzzleModel: mongoose.Model<SavedPuzzle> =
	mongoose.models?.['saved_puzzles'] ??
	mongoose.model(
		'saved_puzzles',
		new Schema<SavedPuzzle>(
			{
				userId: String,
				puzzleId: String,
				type: String,
				timestamp: Date,
				url: String,
				description: String
			},
			{
				timestamps: true,
				toJSON: {
					transform: (_, ret) => {
						delete ret._id;
					}
				},
				toObject: {
					transform: (_, ret) => {
						delete ret._id;
					}
				}
			}
		)
	);

export type SavedPuzzle = {
	userId: string;
	puzzleId: string;
	type: 'random' | 'featured';
	timestamp: Date;
	url: string;
	description: string;
};

export const PuzzleStatsModel: mongoose.Model<SavedPuzzle> =
	mongoose.models?.['puzzle_stats'] ??
	mongoose.model(
		'puzzle_stats',
		new Schema<PuzzleStats>(
			{
				puzzleId: String,
				completions: [
					new Schema({
						userId: {
							type: String,
							required: false
						},
						moves: Number,
						result: String,
						timestamp: Number
					})
				]
			},
			{
				timestamps: true,
				toJSON: {
					transform: (_, ret) => {
						delete ret._id;
						ret.completions = ret.completions.map((r: any) => {
							delete r._id;
							return r;
						});
					}
				},
				toObject: {
					transform: (_, ret) => {
						delete ret._id;
						ret.completions = ret.completions.map((r: any) => {
							delete r._id;
							return r;
						});
					}
				}
			}
		)
	);

export type PuzzleCompletion = {
	userId: string | null;
	moves: number;
	result: 'w' | 'l';
	timestamp: number;
};

export type PuzzleStats = {
	puzzleId: string;
	completions: PuzzleCompletion[];
};
