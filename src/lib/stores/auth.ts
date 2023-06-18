import type { AuthUser } from '$lib/services/auth';
import { writable } from 'svelte/store';

export const authUser = writable<AuthUser | null>(null);
