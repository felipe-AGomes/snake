import { Util } from '../utils/Util';
import { Snake } from './Snake';

type Food = {
	x: number;
	y: number;
	color: string;
};

export class Render {
	public ctx: CanvasRenderingContext2D;
	public food: Food | null = null;
	public canvasWidth: number;
	public canvasHeight: number;
	constructor(
		public canvas: HTMLCanvasElement,
		public blockSize: number,
		public snake: Snake,
	) {
		const [x, y] = Util.randomCoordinates({
			canvasWidth: this.canvas.width,
			blockSize: this.blockSize,
		});
		this.canvas = canvas;
		this.food = { x, y, color: Util.randomColor() };
		this.canvasWidth = canvas.width;
		this.canvasHeight = canvas.height;

		const ctx = canvas.getContext('2d');
		if (!ctx) {
			throw new Error('ctx não instanciado');
		}
		this.ctx = ctx;
	}

	canvasRender() {
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
	}

	snakeRender() {
		let snakeBody = this.snake.snakeBody;
		if (!snakeBody) {
			this.snake.create({
				canvasWidth: this.canvas.width,
				blockSize: this.blockSize,
			});
			snakeBody = this.snake.snakeBody;
			return;
		}
		this.ctx.fillStyle = 'white';
		snakeBody?.forEach(({ x, y }, index) => {
			if (index === snakeBody?.length! - 1) this.ctx.fillStyle = 'gray';
			this.ctx.fillRect(x, y, this.blockSize, this.blockSize);
		});
	}

	gridRender() {
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = 'gray';
		for (let i = this.blockSize; i < this.canvasWidth; i += this.blockSize) {
			this.ctx.beginPath();
			this.ctx.lineTo(i, 0);
			this.ctx.lineTo(i, this.canvas.height);
			this.ctx.stroke();
		}
		for (let i = this.blockSize; i < this.canvasHeight; i += this.blockSize) {
			this.ctx.beginPath();
			this.ctx.lineTo(0, i);
			this.ctx.lineTo(this.canvasWidth, i);
			this.ctx.stroke();
		}
	}

	foodRender() {
		if (!this.food) {
			do {
				const [x, y] = Util.randomCoordinates({
					canvasWidth: this.canvas.width,
					blockSize: this.blockSize,
				});
				this.food = {
					x,
					y,
					color: Util.randomColor(),
				};
			} while (
				this.snake.snakeBody?.some(
					(snake) => snake.x === this.food?.x && snake.y === this.food.y,
				)
			);
			return;
		}
		this.ctx.fillStyle = this.food?.color;
		this.ctx.fillRect(this.food.x, this.food.y, this.blockSize, this.blockSize);
	}
}
