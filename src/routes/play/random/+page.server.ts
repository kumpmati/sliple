import { redirect } from '@sveltejs/kit';
import { nanoid } from 'nanoid';

export const load = () => {
	throw redirect(302, `/play/random/${nanoid()}`);
};
