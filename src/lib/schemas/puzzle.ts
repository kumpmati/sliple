import type { Puzzle } from '$lib/types/puzzle';
import mongoose, { Schema } from 'mongoose';

export const puzzleSchema = new Schema<Puzzle>(
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

export const PuzzleModel = mongoose?.models?.puzzle ?? mongoose.model('puzzle', puzzleSchema);
