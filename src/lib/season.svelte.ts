import { browser } from '$app/environment';
import dayjs from 'dayjs';
import { getContext, setContext } from 'svelte';

export enum Season {
	NONE = 'none',
	CHRISTMAS = 'christmas'
}

export class SeasonManager {
	/**
	 * Current season, ignoring user preferences.
	 */
	activeSeason = $state(Season.NONE);

	/**
	 * Whether or not user has enabled seasonal graphics.
	 */
	enabled = $state(false);

	/**
	 * Current season according to the calendar and user preferences.
	 */
	current = $derived(this.enabled ? this.activeSeason : Season.NONE);

	constructor() {
		this.#load();
	}

	toggleEnabled() {
		this.enabled = !this.enabled;
		this.#save();
	}

	#load() {
		this.activeSeason = this.#getActiveSeason();
		if (browser) {
			this.enabled = localStorage.getItem('season-enabled') !== 'false';
		}
	}

	#save() {
		if (!browser) return;
		localStorage.setItem('season-enabled', this.enabled ? 'true' : 'false');
	}

	#getActiveSeason(): Season {
		if (dayjs().month() === 11) {
			return Season.CHRISTMAS;
		}

		return Season.NONE;
	}
}

export const setSeasonContext = (s: SeasonManager) => setContext('season', s);
export const getSeasonContext = () => getContext<SeasonManager>('season');
