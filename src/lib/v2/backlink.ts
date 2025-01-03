/**
 * Returns the backlink or a fallback url (if defined)
 * @param url
 * @param fallback
 */

export const getBackLink = (url: string | URL, fallback?: string) => {
	const link = url instanceof URL ? url.searchParams : new URLSearchParams(url);
	return link.get('back') ?? fallback ?? null;
};
