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
