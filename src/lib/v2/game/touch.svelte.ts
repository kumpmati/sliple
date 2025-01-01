import { Dir } from '$lib/stores/grid';

export type TouchCtx = {
	id: string | null;
	start: [number, number] | null;
	end: [number, number] | null;
	drag: DragOffset;
};

export type DragOffset = {
	x: number;
	y: number;
};

export const getDragOffset = (
	from: [number, number] | null,
	to: [number, number] | null,
	threshold: number
): DragOffset => {
	const x = (to?.[0] ?? 0) - (from?.[0] ?? 0);
	const y = (to?.[1] ?? 0) - (from?.[1] ?? 0);

	if (Math.abs(x) + Math.abs(y) < threshold) {
		return { x: 0, y: 0 };
	}

	if (Math.abs(x) > Math.abs(y)) {
		return { x: Math.sign(x), y: 0 };
	} else {
		return { y: Math.sign(y), x: 0 };
	}
};

export const getDirFromDeltas = (x: number, y: number): Dir | null => {
	if (x === 0 && y === 0) return null;

	if (Math.abs(x) > Math.abs(y)) {
		return x < 0 ? Dir.LEFT : Dir.RIGHT;
	} else {
		return y < 0 ? Dir.UP : Dir.DOWN;
	}
};
