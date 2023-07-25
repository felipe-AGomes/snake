import { Snake } from './Snake';

export class Render {
	public ctx: CanvasRenderingContext2D;
	constructor(
		public canvas: HTMLCanvasElement,
		public blockSize: number,
		public snake: Snake,
	) {
		this.canvas = canvas;

		const ctx = canvas.getContext('2d');
		if (!ctx) {
			throw new Error('ctx não intanciado');
		}
		this.ctx = ctx;
	}

	canvasRender() {
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	snakeRender() {
		let snakeBody = this.snake.snakeBody;
		if (!snakeBody) {
			this.snake.create(this.canvas, this.blockSize);
			snakeBody = this.snake.snakeBody;
			this.ctx.fillStyle = 'white';

			snakeBody?.forEach(({ x, y }, index) => {
				if (index === snakeBody?.length! - 1) this.ctx.fillStyle = 'gray';
				this.ctx.fillRect(x, y, this.blockSize, this.blockSize);
			});
			return;
		}
	}

	gridRender() {
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = 'gray';

		for (let i = this.blockSize; i < this.canvas.width; i += this.blockSize) {
			this.ctx.beginPath();
			this.ctx.lineTo(i, 0);
			this.ctx.lineTo(i, this.canvas.height);
			this.ctx.stroke();
		}
		for (let i = this.blockSize; i < this.canvas.height; i += this.blockSize) {
			this.ctx.beginPath();
			this.ctx.lineTo(0, i);
			this.ctx.lineTo(this.canvas.width, i);
			this.ctx.stroke();
		}
	}
}
