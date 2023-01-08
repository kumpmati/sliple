import { writable } from 'svelte-local-storage-store';

export const showTutorial = writable<boolean>('sliple-show-tutorial', true);
