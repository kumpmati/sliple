import type { Cookies } from '@sveltejs/kit';
import dayjs from 'dayjs';

export const getUidCookie = (c: Cookies) => {
	return c.get('uid');
};

export const setUidCookie = (c: Cookies, val: string) => {
	c.set('uid', val, {
		path: '/',
		httpOnly: true,
		secure: true,
		expires: dayjs().add(1, 'year').toDate()
	});
};
