import type { PuzzleCompletion } from '$lib/types/completion';
import mongoose, { Schema } from 'mongoose';

export const puzzleCompletionSchema = new Schema<PuzzleCompletion>(
	{
		id: String,
		type: String,
		puzzleId: String,
		numMoves: Number
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

export const PuzzleCompletionModel =
	mongoose?.models?.puzzleCompletion ?? mongoose.model('puzzleCompletion', puzzleCompletionSchema);
