import type { Cookies } from '@sveltejs/kit';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

export const getUidCookie = (c: Cookies) => {
	return c.get('uid');
};

export const setOrUpdateCookie = (c: Cookies) => {
	c.set('uid', getUidCookie(c) ?? nanoid(), {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		expires: dayjs().add(1, 'year').toDate()
	});
};

export const clearUidCookie = (c: Cookies) => {
	c.delete('uid', {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'lax'
	});
};
