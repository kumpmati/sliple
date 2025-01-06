import { getContext, setContext } from 'svelte';
import { LocalStatsDatabase } from './db';

const key = Symbol('local-db');

export const initLocalDbContext = () => {
	return setContext(key, new LocalStatsDatabase());
};

export const getLocalDbContext = () => getContext<LocalStatsDatabase>(key);
