export class Util {
	static randomCoordinates(
		canvas: HTMLCanvasElement,
		blockSize: number,
	): [number, number] {
		const x = this.randomNumberUpTo(canvas.width / blockSize - 1) * blockSize
		const y = this.randomNumberUpTo(canvas.width / blockSize - 1) * blockSize
		
		return [x, y];
	}

	static randomNumberUpTo(number: number) {
		return Math.round(Math.random() * number);
	}

	static randomColor() {
		const r = this.randomValueBetween(100, 155);
		const g = this.randomValueBetween(100, 155);
		const b = this.randomValueBetween(100, 155);

		return `rgb(${r},${g},${b})`;
	}

	static randomValueBetween(from: number, to: number) {
		return Math.round(Math.random() * (to - from)) + from;
	}
}
