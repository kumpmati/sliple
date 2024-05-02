import { persisted } from 'svelte-persisted-store';

export const soundsEnabled = persisted<boolean>('sliple-sounds-enabled', false);
