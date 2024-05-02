import { redirect } from '@sveltejs/kit';
import { nanoid } from 'nanoid';

export const load = () => {
	redirect(302, `/play/random/${nanoid()}`);
};
