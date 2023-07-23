import { IUtil, Util } from '../utils/index';

export type DirectionType = 'right' | 'left' | 'top' | 'bottom';
export type KeyMapType = { test: boolean; direction: DirectionType };
export type SnakeBody = { x: number; y: number };
export type Color = string;
export type FoodPositionType = { x: number; y: number };
export type FoodType = FoodPositionType & { color: Color };
export type Score = number;

export interface IScoreController {
	increaseScore(): void;
	get score(): Score;
	get endGameElement(): HTMLDivElement;
	resetGame(): void;
	endGame(): void;
}

export interface ISnake {
	get snakeBody(): SnakeBody[] | [];
	set snakeBody(snakeBody: SnakeBody[]);
	moveSnake(size: number): void;
	setInitialSnakePosition(canvasWidth: number, size: number): void;
}

export interface IFood {
	get food(): FoodType | null;
	set food(newFood: FoodType | null);
	generateFood(canvasWidth: number, size: number): void;
	generateRandomPosition(canvasWidth: number, size: number): FoodPositionType;
	generateRandomColor(): Color;
}

export interface IMoveController {
	getCurrentDirection(): DirectionType;
	setTemporaryDirection({ key }: KeyboardEvent): void;
}

export interface ICanvasRender {
	get size(): number;
	get canvasWidth(): number;
	get canvasHeight(): number;
	createCanvas(): void;
	snakeRender(): void;
	foodRender(): void;
	gridRender(): void;
}

export class MoveController implements IMoveController {
	private currentDirection: DirectionType;
	private temporaryDirection: DirectionType;
	constructor() {
		this.currentDirection = 'right';
		this.temporaryDirection = 'right';
	}

	getCurrentDirection(): DirectionType {
		this.currentDirection = this.temporaryDirection;
		return this.currentDirection;
	}

	setTemporaryDirection({ key }: KeyboardEvent): void {
		const keyMap: KeyMapType[] = [
			{
				test: key === 'ArrowRight' && this.currentDirection !== 'left',
				direction: 'right',
			},
			{
				test: key === 'ArrowLeft' && this.currentDirection !== 'right',
				direction: 'left',
			},
			{
				test: key === 'ArrowUp' && this.currentDirection !== 'bottom',
				direction: 'top',
			},
			{
				test: key === 'ArrowDown' && this.currentDirection !== 'top',
				direction: 'bottom',
			},
		];
		this.temporaryDirection =
			keyMap.find(({ test }) => test)?.direction ?? this.currentDirection;
	}
}

export class Snake implements ISnake {
	private _snakeBody: SnakeBody[];
	constructor(private moveController: IMoveController) {
		this.moveController = moveController;
		this._snakeBody = [];
	}
	get snakeBody() {
		return this._snakeBody;
	}
	set snakeBody(snakeBody: SnakeBody[]) {
		this._snakeBody = snakeBody;
	}

	moveSnake(size: number): void {
		const snakeHead = this.snakeBody[this.snakeBody.length - 1];

		const changeDirection = {
			right: { x: snakeHead.x + size, y: snakeHead.y },
			left: { x: snakeHead.x - size, y: snakeHead.y },
			top: { x: snakeHead.x, y: snakeHead.y - size },
			bottom: { x: snakeHead.x, y: snakeHead.y + size },
		};
		this.snakeBody.shift();
		this.snakeBody.push(
			changeDirection[this.moveController.getCurrentDirection()],
		);
	}

	setInitialSnakePosition(canvasWidth: number, size: number): void {
		this.snakeBody = [
			{
				x: (canvasWidth / size / 2) * 30 - size,
				y: (canvasWidth / size / 2) * 30,
			},
			{
				x: (canvasWidth / size / 2) * 30,
				y: (canvasWidth / size / 2) * 30,
			},
		];
	}
}

export class Food implements IFood {
	private _food: FoodType | null;
	constructor(private snake: ISnake, private util: IUtil) {
		this._food = null;
	}
	generateFood(canvasWidth: number, size: number): void {
		this.food = {
			...this.generateRandomPosition(canvasWidth, size),
			color: this.generateRandomColor(),
		};
	}

	generateRandomPosition(canvasWidth: number, size: number): FoodPositionType {
		let x = this.util.randomNumberUpTo(canvasWidth / size - 1) * size;
		let y = this.util.randomNumberUpTo(canvasWidth / size - 1) * size;
		while (this.snake.snakeBody.find((snake) => snake.x === x && snake.y === y)) {
			x = this.util.randomNumberUpTo(canvasWidth / size - 1) * size;
			y = this.util.randomNumberUpTo(canvasWidth / size - 1) * size;
		}

		return { x, y };
	}

	generateRandomColor(): Color {
		return `rgb(${this.util.randomNumberBetween(
			100,
			155,
		)}, ${this.util.randomNumberBetween(
			100,
			155,
		)}, ${this.util.randomNumberBetween(100, 155)})`;
	}

	get food() {
		return this._food;
	}

	set food(newFood: FoodType | null) {
		this._food = newFood;
	}
}

export class ScoreController implements IScoreController {
	private _score: Score;
	constructor(
		private scoreElement: HTMLParagraphElement,
		public _endGameElement: HTMLDivElement,
	) {
		this._score = 0;
	}

	increaseScore() {
		this._score += 10;
		this.scoreElement.innerText = `${+this.scoreElement.innerText + 10}`;
	}

	resetGame() {
		this.endGameElement.style.display = 'none';
	}

	endGame(): void {
		this.endGameElement.style.display = 'flex';
	}

	get endGameElement() {
		return this._endGameElement;
	}

	get score() {
		return this._score;
	}
}
export class CanvasRender implements ICanvasRender {
	private _canvasWidth: number;
	private _canvasHeight: number;
	constructor(
		private canvas: HTMLCanvasElement,
		private ctx: CanvasRenderingContext2D,
		private _size: number,
		private snake: ISnake,
		private food: IFood,
	) {
		this._canvasWidth = canvas.width;
		this._canvasHeight = canvas.height;
	}

	get size(): number {
		return this._size;
	}

	get canvasWidth(): number {
		return this._canvasWidth;
	}

	get canvasHeight(): number {
		return this._canvasHeight;
	}

	createCanvas(): void {
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	snakeRender(): void {
		if (this.snake.snakeBody.length === 0)
			this.snake.setInitialSnakePosition(this.canvasWidth, this.size);
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

	foodRender(): void {
		if (!this.food.food) {
			this.food.generateFood(this.canvasWidth, this.size);
		}
		const { x, y, color } = this.food.food!;
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x, y, this.size, this.size);
	}

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

export class Game {
	private timeoutId: NodeJS.Timeout | null;
	private hasEnded: boolean;
	private canvasElementContain: HTMLDivElement;
	constructor(
		private canvasRender: ICanvasRender,
		private snake: ISnake,
		private food: IFood,
		private scoreController: IScoreController,
	) {
		this.hasEnded = false;
		this.timeoutId = null;
		this.canvasElementContain = this.scoreController.endGameElement
			.previousElementSibling as HTMLDivElement;
	}

	private checkPoint() {
		const snakeHead = this.snake.snakeBody[this.snake.snakeBody.length - 1];
		if (snakeHead.x === this.food.food?.x && snakeHead.y === this.food.food.y) {
			this.snake.snakeBody = [snakeHead, ...this.snake.snakeBody];
			this.scoreController.increaseScore();
			this.food.food = null;
		}
	}

	private finishGame() {
		this.scoreController.endGame();
		this.canvasElementContain.style.filter = 'blur(5px)';
		this.hasEnded = true;
	}

	resetGame() {
		this.canvasElementContain.style.filter = 'none';
		this.hasEnded = false;
		this.snake.snakeBody = [];
		this.gameLoop();
		this.scoreController.resetGame();
	}

	private checkEndGame() {
		const snakeHead = this.snake.snakeBody[this.snake.snakeBody.length - 1];
		const snakeCollision = this.snake.snakeBody.find(
			(snake, index) =>
				snake.x === snakeHead.x &&
				snake.y === snakeHead.y &&
				index < this.snake.snakeBody.length - 1,
		);
		const wallCollision =
			snakeHead.x < 0 ||
			snakeHead.y < 0 ||
			snakeHead.x >= this.canvasRender.canvasWidth ||
			snakeHead.y >= this.canvasRender.canvasHeight;

		if (snakeCollision || wallCollision) {
			this.finishGame();
		}
	}

	private gameLoop() {
		if (this.timeoutId) clearTimeout(this.timeoutId);

		if (!this.hasEnded) {
			this.canvasRender.createCanvas();
			this.canvasRender.gridRender();
			this.canvasRender.snakeRender();
			this.canvasRender.foodRender();
			this.snake.moveSnake(this.canvasRender.size);
			this.checkEndGame();
			this.canvasRender.snakeRender();
			this.checkPoint();

			this.timeoutId = setTimeout(() => {
				this.gameLoop();
			}, 300);
		}
	}

	startGame() {
		this.gameLoop();
	}
}

export const makeGame = (
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D,
	scoreElement: HTMLParagraphElement,
	endGameElement: HTMLDivElement,
) => {
	const util = new Util();
	const moveController = new MoveController();
	const snake = new Snake(moveController);
	const scoreController = new ScoreController(scoreElement, endGameElement);
	const food = new Food(snake, util);
	const canvasRender = new CanvasRender(canvas!, ctx!, 30, snake, food);
	const game = new Game(canvasRender, snake, food, scoreController);
	return { game, moveController };
};
