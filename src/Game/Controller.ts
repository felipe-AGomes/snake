import { Render } from './Render';
import { Direction, Snake } from './Snake';

type KeyBoardMap = { test: boolean; result: Direction };

export class Controller {
	public endGame: boolean = false;
	public _score: number = 0;
	public _direction: Direction = 'right';
	public _temporaryDirection: Direction = 'right';
	public interval: NodeJS.Timeout | null = null;
	constructor(public render: Render, public snake: Snake) {}

	set score(newScore: number) {
		this._score = newScore;
	}

	get score() {
		return this._score;
	}

	set direction(newDirection) {
		this._direction = newDirection;
	}

	get direction() {
		return this._direction;
	}

	set temporaryDirection(newTemporaryDirection) {
		this._temporaryDirection = newTemporaryDirection;
	}
	get temporaryDirection() {
		return this._temporaryDirection;
	}

	keyboardListener({ key }: KeyboardEvent) {
		const keyboardMap: KeyBoardMap[] = [
			{ test: 'ArrowUp' === key && this.direction !== 'bottom', result: 'top' },
			{
				test: 'ArrowDown' === key && this.direction !== 'top',
				result: 'bottom',
			},
			{
				test: 'ArrowRight' === key && this.direction !== 'left',
				result: 'right',
			},
			{ test: 'ArrowLeft' === key && this.direction !== 'right', result: 'left' },
		];
		this.temporaryDirection =
			keyboardMap.find(({ test }) => test)?.result ?? this.direction;
	}

	checkPoint() {
		const food = this.render.food;
		if (!this.snake.snakeBody || !food) throw new Error('Snake não renderizada');
		const snakeHead = this.snake.snakeBody[this.snake.snakeBody?.length - 1];
		if (snakeHead.x === food.x && snakeHead.y === food.y) {
			this._score = 10;
			this.snake.increase();
		}
	}

	checkEndGame() {
		if (!this.snake.snakeBody) throw new Error('Snake não renderizada');
		const snakeHead = this.snake.snakeBody[this.snake.snakeBody?.length - 1];
		const wallCollision =
			snakeHead.x < 0 ||
			snakeHead.y < 0 ||
			snakeHead.x >= this.render.canvasWidth ||
			snakeHead.y >= this.render.canvasHeight;
		const bodyCollision = this.snake.snakeBody.some(
			(snakeBody, index) =>
				snakeBody.x === snakeHead.x &&
				snakeBody.y === snakeHead.y &&
				index !== this.snake.snakeBody?.length! - 1,
		);
		if (wallCollision || bodyCollision) {
			this.endGame = true;
		}
	}

	loop() {
		if (this.interval) clearInterval(this.interval);
		this.render.snakeRender();
		this.render.canvasRender();
		this.checkEndGame();
		this.render.gridRender();
		this.render.foodRender();
		this.checkPoint();
		this.direction = this.temporaryDirection;
		this.snake.move(this.direction, this.render.blockSize);
		this.render.snakeRender();
		if (!this.endGame) {
			this.interval = setTimeout(() => this.loop(), 300);
		}
	}
}
