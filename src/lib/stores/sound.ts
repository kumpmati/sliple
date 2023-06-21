import { writable } from 'svelte-local-storage-store';

export const soundsEnabled = writable<boolean>('sliple-sounds-enabled', false);
