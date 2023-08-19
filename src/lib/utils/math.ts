export const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(val, max));

export const mapToRange = (
	current: number,
	in_min: number,
	in_max: number,
	out_min: number,
	out_max: number
): number => {
	const mapped = ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
	return clamp(mapped, out_min, out_max);
};

export const sum = (arr: number[], initial = 0): number => {
	return arr.reduce((prev, curr) => prev + curr, initial);
};
