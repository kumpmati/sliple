import type { CampaignLevel } from '$lib/types/campaign';
import type { Puzzle } from '$lib/types/puzzle';

export const shareDailyPuzzle = (p: Puzzle | CampaignLevel) => {
	return navigator.share({
		title: `Daily puzzle - ${new Date().toLocaleDateString()}`,
		url: 'https://sliple.app/play/daily',
		text: `Can you solve today's puzzle '${p.data.solution}' in ${p.data.maxMoves.bronze} moves?`
	});
};

export const shareRandomPuzzle = (p: Puzzle | CampaignLevel) => {
	return navigator.share({
		title: `Random puzzle - '${p.data.solution}'`,
		url: `https://sliple.app/play/random/${p.id}`,
		text: `Can you solve this random puzzle '${p.data.solution}' in ${p.data.maxMoves.bronze} moves?`
	});
};
