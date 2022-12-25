export const formatDuration = (start: number | null, end: number | null): string => {
	if (!start || !end) return '0min 0s';

	const elapsed = Math.round(end - start);
	const seconds = Math.round((elapsed / 1000) % 60);
	const minutes = Math.round((elapsed / 1000 / 60) % 60);

	return `${minutes}min ${seconds}s`;
};
