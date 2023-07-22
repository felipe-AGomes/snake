// export type DirectionType = 'right' | 'left' | 'top' | 'bottom';

// type FoodType = {
// 	x: number;
// 	y: number;
// 	color: string;
// };

// type KeyTest = {
// 	test: boolean;
// 	direction: DirectionType;
// };

// export class Snake {
// 	public size: number;
// 	private canvasSize: number;
// 	private snake: { x: number; y: number }[];
// 	private food: FoodType | null;
// 	private temporaryDirection: DirectionType | null;
// 	private direction: DirectionType;

// 	constructor(canvasSize: number, size: number) {
// 		this.canvasSize = canvasSize;
// 		this.size = size;
// 		this.snake = [
// 			{ x: (canvasSize / size / 2) * size, y: (canvasSize / size / 2) * size },
// 			{
// 				x: (canvasSize / size / 2) * size + size,
// 				y: (canvasSize / size / 2) * size,
// 			},
// 		];
// 		this.food = null;
// 		this.temporaryDirection = null;
// 		this.direction = 'right';
// 	}

// 	public setDirection({ key }: KeyboardEvent) {
// 		const directionMap: KeyTest[] = [
// 			{ test: key === 'ArrowUp' && this.direction !== 'bottom', direction: 'top' },
// 			{
// 				test: key === 'ArrowDown' && this.direction !== 'top',
// 				direction: 'bottom',
// 			},
// 			{
// 				test: key === 'ArrowRight' && this.direction !== 'left',
// 				direction: 'right',
// 			},
// 			{
// 				test: key === 'ArrowLeft' && this.direction !== 'right',
// 				direction: 'left',
// 			},
// 		];
// 		this.temporaryDirection =
// 			directionMap.find(({ test }) => test)?.direction || this.direction;
// 	}

// 	public moveSnake() {
// 		this.direction = this.temporaryDirection || this.direction;
// 		if (!this.direction) {
// 			return;
// 		}
// 		const snakeHeader = this.snake[this.snake.length - 1];
// 		const getSnakePosition = {
// 			top: { x: snakeHeader.x, y: snakeHeader.y - this.size },
// 			bottom: { x: snakeHeader.x, y: snakeHeader.y + this.size },
// 			left: { x: snakeHeader.x - this.size, y: snakeHeader.y },
// 			right: { x: snakeHeader.x + this.size, y: snakeHeader.y },
// 		};
// 		this.snake.shift();
// 		this.snake.push(getSnakePosition[this.direction]);
// 	}

// 	public getSnake() {
// 		return this.snake;
// 	}

// 	public getFood() {
// 		return this.food;
// 	}

// 	public updateFood(newFood: FoodType | null) {
// 		this.food = newFood;
// 	}

// 	public checkEndGame() {
// 		const snakeHeader = this.snake[this.snake.length - 1];
// 		const snakeBody = this.snake.slice(0, this.snake.length - 1);
// 		const wallCollision =
// 			snakeHeader.x >= this.canvasSize ||
// 			snakeHeader.y >= this.canvasSize ||
// 			snakeHeader.x < 0 ||
// 			snakeHeader.y < 0;
// 		const snakeCollision = snakeBody.find(
// 			(snakeBody) =>
// 				snakeBody.x === snakeHeader.x && snakeBody.y === snakeHeader.y,
// 		);

// 		return snakeCollision || wallCollision;
// 	}
// }

// export class Game {
// 	private snake: Snake;
// 	private pontuationRef: React.RefObject<HTMLParagraphElement>;
// 	private endGameRef: React.RefObject<HTMLDivElement>;
// 	private loopTimeout: NodeJS.Timeout | null;

// 	constructor(
// 		snake: Snake,
// 		pontuationRef: React.RefObject<HTMLParagraphElement>,
// 		endGameRef: React.RefObject<HTMLDivElement>,
// 	) {
// 		this.snake = snake;
// 		this.pontuationRef = pontuationRef;
// 		this.endGameRef = endGameRef;
// 		this.loopTimeout = null;
// 	}

// 	public endGame() {
// 		if (this.loopTimeout) {
// 			clearInterval(this.loopTimeout);
// 			this.loopTimeout = null;
// 			if (this.endGameRef.current) {
// 				this.endGameRef.current.style.display = 'flex';
// 				(
// 					this.endGameRef.current.previousElementSibling as HTMLCanvasElement
// 				).style.filter = 'blur(5px)';
// 			}
// 		}
// 	}

// 	public checkPontuation() {
// 		const snakeHeader = this.snake.getSnake()[this.snake.getSnake().length - 1];
// 		const food = this.snake.getFood();
// 		if (food && snakeHeader.x === food.x && snakeHeader.y === food.y) {
// 			this.snake.getSnake().push(food);
// 			this.snake.updateFood(null);
// 			if (this.pontuationRef.current) {
// 				this.pontuationRef.current.innerText = `${
// 					+this.pontuationRef.current.innerText + 10
// 				}`;
// 			}
// 		}
// 	}

// 	public gameLoop() {
// 		this.loopTimeout = setTimeout(() => {
// 			if (!this.snake.checkEndGame()) {
// 				this.checkPontuation();
// 				this.snake.moveSnake();
// 				this.drawSnake();
// 				this.drawBoardLines();
// 				this.drawFood();
// 				this.gameLoop();
// 			} else {
// 				this.endGame();
// 			}
// 		}, 300);
// 	}

// 	public drawSnake() {
// 		const canvas = document.getElementById('board') as HTMLCanvasElement;
// 		if (!canvas) return;

// 		const ctx = canvas.getContext('2d');
// 		if (!ctx) return;

// 		const snake = this.snake.getSnake();
// 		ctx.clearRect(0, 0, canvas.width, canvas.height);

// 		snake.forEach(({ x, y }, index) => {
// 			ctx.fillStyle = index === snake.length - 1 ? 'white' : 'gray';
// 			ctx.fillRect(x, y, this.snake.size, this.snake.size);
// 		});
// 	}

// 	public drawFood() {
// 		const canvas = document.getElementById('board') as HTMLCanvasElement;
// 		if (!canvas) return;

// 		const ctx = canvas.getContext('2d');
// 		if (!ctx) return;

// 		let food = this.snake.getFood();
// 		if (!food) {
// 			const canvasLength = (canvas.width - this.snake.size) / this.snake.size;
// 			food = {
// 				x: Math.round(Math.random() * canvasLength) * this.snake.size,
// 				y: Math.round(Math.random() * canvasLength) * this.snake.size,
// 				color: `rgb(${Math.round(Math.random() * 255)}, ${Math.round(
// 					Math.random() * 255,
// 				)}, ${Math.round(Math.random() * 255)})`,
// 			};
// 			while (
// 				this.snake
// 					.getSnake()
// 					.find((snake) => snake.x === food?.x && snake.y === food.y)
// 			) {
// 				food = {
// 					x: Math.round(Math.random() * canvasLength) * this.snake.size,
// 					y: Math.round(Math.random() * canvasLength) * this.snake.size,
// 					color: `rgb(${Math.round(Math.random() * (255 + 20) - 20)}, ${Math.round(
// 						Math.random() * (255 + 20) - 20,
// 					)}, ${Math.round(Math.random() * (255 + 20) - 20)})`,
// 				};
// 			}
// 			this.snake.updateFood(food);
// 		}
// 		ctx.fillStyle = this.snake.getFood()?.color!;
// 		ctx.fillRect(food.x, food.y, this.snake.size, this.snake.size);
// 	}

// 	public drawBoardLines() {
// 		const canvas = document.getElementById('board') as HTMLCanvasElement;
// 		if (!canvas) return;

// 		const ctx = canvas.getContext('2d');
// 		if (!ctx) return;

// 		const size = this.snake.size;
// 		const canvasSize = canvas.width;
// 		ctx.lineWidth = 1;
// 		ctx.strokeStyle = 'white';

// 		for (let i = size; i < canvasSize; i += size) {
// 			ctx.beginPath();
// 			ctx.lineTo(i, 0);
// 			ctx.lineTo(i, canvasSize);
// 			ctx.stroke();
// 		}
// 		for (let i = size; i < canvasSize; i += size) {
// 			ctx.beginPath();
// 			ctx.lineTo(0, i);
// 			ctx.lineTo(canvasSize, i);
// 			ctx.stroke();
// 		}
// 	}

// 	public setDirection(event: KeyboardEvent) {
// 		this.snake.setDirection(event);
// 	}

// 	public resetGame() {
// 		if (this.endGameRef.current) {
// 			this.endGameRef.current.style.display = 'none';
// 			(
// 				this.endGameRef.current.previousElementSibling as HTMLCanvasElement
// 			).style.filter = 'none';
// 		}
// 		this.startGame();
// 	}

// 	public startGame() {
// 		this.gameLoop();
// 	}
// }

// export class CanvasRenderer {
// 	private canvasRef: React.RefObject<HTMLCanvasElement>;

// 	constructor(canvasRef: React.RefObject<HTMLCanvasElement>) {
// 		this.canvasRef = canvasRef;
// 	}

// 	public drawCanvas() {
// 		const canvas = this.canvasRef.current;
// 		if (!canvas) return;

// 		const ctx = canvas.getContext('2d');
// 		if (!ctx) return;

// 		const canvasSize = canvas.width;
// 		ctx.fillStyle = 'black';
// 		ctx.fillRect(0, 0, canvasSize, canvasSize);
// 	}
// }

type SnakeBody = { x: number; y: number };
abstract class AbstractCanvasRender {
	abstract get size(): number;
	abstract createCanvas(): void;
	abstract snakeRender(): void;
	abstract foodRender(): void;
	abstract gridRender(): void;
	abstract initialSnakePosition(): SnakeBody[];
}

abstract class AbstractSnake {
	abstract get snakeBody(): SnakeBody[] | [];
	abstract set snakeBody(snakeBody: SnakeBody[]);
	abstract snakeMove(direction: string, size: number): void;
}

export class Snake extends AbstractSnake {
	private _snakeBody: SnakeBody[];
	constructor() {
		super();
		this._snakeBody = [];
	}
	get snakeBody() {
		return this._snakeBody;
	}
	set snakeBody(snakeBody: SnakeBody[]) {
		this._snakeBody = snakeBody;
	}

	snakeMove(direction: string, size: number): void {
		this._snakeBody = this._snakeBody.map(({ x, y }) => ({ x: x + size, y }));
	}
}

export class CanvasRender extends AbstractCanvasRender {
	private canvasWidth: number;
	private canvasHeight: number;
	constructor(
		private canvas: HTMLCanvasElement,
		private ctx: CanvasRenderingContext2D,
		private _size: number,
		private snake: AbstractSnake,
	) {
		super();
		this.canvasWidth = canvas.width;
		this.canvasHeight = canvas.height;
	}

	get size() {
		return this._size;
	}

	createCanvas(): void {
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	initialSnakePosition(): SnakeBody[] {
		return [
			{
				x: (this.canvasWidth / this.size / 2) * 30 - this.size,
				y: (this.canvasWidth / this.size / 2) * 30,
			},
			{
				x: (this.canvasWidth / this.size / 2) * 30,
				y: (this.canvasWidth / this.size / 2) * 30,
			},
		];
	}

	snakeRender(): void {
		if (this.snake.snakeBody.length === 0)
			this.snake.snakeBody = this.initialSnakePosition();
		this.snake.snakeBody.forEach(({ x, y }, index) => {
			if (index === this.snake.snakeBody.length - 1) {
				this.ctx.fillStyle = 'gray';
				this.ctx.fillRect(x, y, this.size, this.size);
				return;
			}
			this.ctx.fillStyle = 'white';
			this.ctx.fillRect(x, y, this.size, this.size);
		});
	}
	foodRender(): void {}
	gridRender(): void {
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = 'white';

		for (let i = this.size; i < this.canvasWidth; i += this.size) {
			this.ctx.beginPath();
			this.ctx.lineTo(i, 0);
			this.ctx.lineTo(i, this.canvasHeight);
			this.ctx.stroke();
		}
		for (let i = this.size; i < this.canvasHeight; i += this.size) {
			this.ctx.beginPath();
			this.ctx.lineTo(0, i);
			this.ctx.lineTo(this.canvasWidth, i);
			this.ctx.stroke();
		}
	}
}

abstract class AbstractMoveController {
	abstract get currentDirection(): string;
}

export class MoveController {
	private _currentDirection: string;
	constructor() {
		this._currentDirection = 'right';
	}

	get currentDirection() {
		return this._currentDirection;
	}
}

export class Game {
	private timeoutId: NodeJS.Timeout | null;
	constructor(
		private canvasRender: AbstractCanvasRender,
		private snake: AbstractSnake,
		private moveController: AbstractMoveController,
	) {
		this.timeoutId = null;
	}

	private gameLoop() {
		if (this.timeoutId) clearTimeout(this.timeoutId);

		this.canvasRender.createCanvas();
		this.canvasRender.gridRender();
		this.canvasRender.snakeRender();
		this.snake.snakeMove(
			this.moveController.currentDirection,
			this.canvasRender.size,
		);

		this.timeoutId = setTimeout(() => {
			this.gameLoop();
		}, 300);
	}

	public startGame() {
		this.gameLoop();
	}
}
