export const formatDuration = (start: number | null, end: number | null): string => {
	if (!start || !end) return '0min 0s';

	const elapsed = Math.round(end - start);
	const seconds = Math.floor(elapsed / 1000) % 60;
	const minutes = Math.floor(elapsed / 1000 / 60) % 60;
	const hours = Math.floor(elapsed / 1000 / 60 / 60) % 24;

	return `${hours > 0 ? hours + 'h' : ''}${minutes}min ${seconds}s`;
};
