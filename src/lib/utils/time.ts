export const formatSeconds = (total_sec: number): string => {
	const hours = Math.floor(total_sec / 60 / 60) % 24;
	const seconds = Math.floor(total_sec) % 60;
	const minutes = Math.floor(total_sec / 60) % 60;

	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
