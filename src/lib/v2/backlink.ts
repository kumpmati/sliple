import { browser } from '$app/environment';
import { page } from '$app/state';

/**
 * Returns the backlink or a fallback url (if defined)
 * @param url
 * @param fallback
 */

export const getBackLink = (fallback?: string) => {
	if (!browser) return fallback ?? null;
	return page.url.searchParams.get('back') ?? fallback ?? null;
};
