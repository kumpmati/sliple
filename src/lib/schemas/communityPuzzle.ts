import type { CommunityPuzzle } from '$lib/types/communityPuzzle';
import mongoose, { Schema } from 'mongoose';

export const communityPuzzleSchema = new Schema<CommunityPuzzle>(
	{
		id: String,
		name: { type: Schema.Types.String, maxlength: 50, minlength: 1 },
		code: Schema.Types.String
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

export const CommunityPuzzleModel =
	mongoose?.models?.community_puzzle ?? mongoose.model('community_puzzle', communityPuzzleSchema);
