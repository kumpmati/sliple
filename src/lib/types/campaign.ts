import type { Grid } from './grid';

export type Campaign = {
	id: string;
	name: string;
	description: string | null;
	difficulty: Difficulty | null;
	publishedAt: Date;
	levels: CampaignLevel[];
};

export type CampaignLevel = {
	id: string;
	message: string | null;
	difficulty: Difficulty | null;
	data: Grid;
};

export type Difficulty = 'beginner' | 'moderate' | 'hard' | 'expert';
