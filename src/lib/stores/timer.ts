import { formatDuration } from '$lib/utils/time';
import { writable } from 'svelte/store';

export const createTimer = () => {
	let startTime: number | null;
	let endTime: number | null;
	let interval: any;

	const duration = writable<string>(formatDuration(null, null));

	const start = () => {
		duration.set(formatDuration(null, null));
		startTime = Date.now();
		endTime = null;

		interval = setInterval(() => {
			duration.set(formatDuration(startTime, Date.now()));
		}, 1000);
	};

	const stop = () => {
		endTime = Date.now();

		clearInterval(interval);
		duration.set(formatDuration(startTime, endTime));
	};

	const clear = () => {
		startTime = null;
		endTime = null;
		clearInterval(interval);
		interval = null;
	};

	return {
		subscribe: duration.subscribe,
		start,
		stop,
		clear
	};
};
