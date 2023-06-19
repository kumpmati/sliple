export const groupBy = <T, K extends string>(arr: T[], func: (item: T) => K): Record<K, T[]> => {
	const items = {} as Record<K, T[]>;

	for (const item of arr) {
		const key = func(item);

		if (!items[key]) items[key] = [];

		items[key].push(item);
	}

	return items;
};
