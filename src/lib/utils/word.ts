export const normalizeWord = (w: string | undefined): string =>
	w?.toLowerCase().replaceAll('_', ' ').trim().replaceAll(' ', '_') ?? '';
