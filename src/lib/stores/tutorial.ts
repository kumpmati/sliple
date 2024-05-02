import { persisted } from 'svelte-persisted-store';

export const showTutorial = persisted<boolean>('sliple-show-tutorial', true);
