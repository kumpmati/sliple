import type { Campaign } from '$lib/types/campaign';
import mongoose, { Schema } from 'mongoose';

export const campaignSchema = new Schema<Campaign>(
	{
		id: String,
		name: String,
		description: {
			type: String,
			required: false
		},
		difficulty: {
			type: String,
			required: false
		},
		publishedAt: Date,
		levels: Schema.Types.Mixed
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

export const CampaignModel =
	mongoose?.models?.campaign ?? mongoose.model('campaign', campaignSchema);
