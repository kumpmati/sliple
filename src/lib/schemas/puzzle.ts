import type { Puzzle_v1, Puzzle_v2 } from '$lib/types/puzzle';
import mongoose, { Schema } from 'mongoose';

export const puzzleSchema_v1 = new Schema<Puzzle_v1>(
	{
		id: String,
		data: Schema.Types.Mixed,
		publishedAt: Date
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
);

export const PuzzleModel_v1 = mongoose?.models?.puzzle ?? mongoose.model('puzzle', puzzleSchema_v1);

export const puzzleSchema_v2 = new Schema<Puzzle_v2>(
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
);

export const PuzzleModel_v2 =
	mongoose?.models?.puzzle_v2 ?? mongoose.model('puzzle_v2', puzzleSchema_v2);
