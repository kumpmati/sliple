import type { GameAudio } from '$lib/services/sound';
import { getContext, setContext } from 'svelte';
import { persisted } from 'svelte-persisted-store';

export const soundsEnabled = persisted<boolean>('sliple-sounds-enabled', false);

export const setSfxContext = (val: SfxContext) => setContext('sfx', val);
export const getSfxContext = () => getContext<SfxContext>('sfx');

export type SfxContext = { current: GameAudio | null };
