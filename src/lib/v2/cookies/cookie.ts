import { browser } from '$app/environment';
import type { Cookies } from '@sveltejs/kit';
import dayjs from 'dayjs';

const CONSENT_COOKIE_NAME = 'cookie_consent';

export const hasCookieConsent = (c: Cookies): boolean => {
	return c.get(CONSENT_COOKIE_NAME) === 'true';
};

export const getConsentCookie = (): boolean | null => {
	if (!browser) return null;

	const cookie = document.cookie
		.split(';')
		.map((c) => c.trim())
		.find((c) => c.startsWith(CONSENT_COOKIE_NAME + '='));

	if (!cookie) {
		return null;
	}

	return cookie.replace(CONSENT_COOKIE_NAME + '=', '') === 'true';
};

export const setConsentCookie = (value: boolean) => {
	const date = dayjs().add(180, 'days').toDate();
	document.cookie = `${CONSENT_COOKIE_NAME}=${value}; expires=${date.toUTCString()}; path=/`;
};

export const clearAllCookies = () => {
	document.cookie.split(';').forEach(function (c) {
		document.cookie = c.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
	});
};
