import type { Cookies } from '@sveltejs/kit';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

export const getUidCookie = (c: Cookies) => {
	return c.get('uid');
};

export const createUidCookie = (c: Cookies) => {
	c.set('uid', nanoid(), {
		path: '/',
		httpOnly: true,
		secure: true,
		expires: dayjs().add(1, 'year').toDate()
	});
};
