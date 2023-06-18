import tippy, { type Instance } from 'tippy.js';

export const tooltip = (node: HTMLElement, text: string) => {
	let t: Instance | null = tippy(node, { content: text });

	if (!text) t.destroy();

	return {
		update: (newText: string) => {
			if (newText) {
				t = tippy(node, { content: text });
			} else {
				t?.destroy();
				t = null;
			}
		},
		destroy: t.destroy
	};
};
