export const normalizeWord = (w: string): string =>
	w.toLowerCase().replaceAll('_', ' ').trim().replaceAll(' ', '_');
