export const wiggly = (node: HTMLElement, { scale = 1, xOffset = 0, yOffset = 0 }) => {
	let x = xOffset;
	let y = yOffset;

	const handleOrientation = (e: DeviceOrientationEvent) => {
		x = -((e?.gamma ?? 0) + xOffset) * scale;
		y = -((e?.beta ?? 0) + yOffset) * scale;

		node.style.setProperty('--xOffset', `${x}px`);
		node.style.setProperty('--yOffset', `${y}px`);
		node.style.setProperty('--xOffsetInverse', `${-x}px`);
		node.style.setProperty('--yOffsetInverse', `${-y}px`);
		node.style.setProperty('--totalOffset', `${Math.abs(x) + Math.abs(y)}`);
	};

	window.addEventListener('deviceorientation', handleOrientation);

	return {
		destroy() {
			window.removeEventListener('deviceorientation', handleOrientation);
		}
	};
};
