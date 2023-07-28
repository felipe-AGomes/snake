import { ElementController } from './ElementController';
import { Render } from './Render';
import { Direction, Snake } from './Snake';

type KeyBoardMap = { test: boolean; result: Direction };

export class GameController {
	public _endGame: boolean = false;
	public _score: number = 0;
	public _direction: Direction = 'right';
	public _temporaryDirection: Direction = 'right';
	public interval: NodeJS.Timeout | null = null;
	constructor(
		public render: Render,
		public snake: Snake,
		public elementController: ElementController,
	) {}

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

	get endGame() {
		return this._endGame;
	}

	set endGame(newVal: boolean) {
		this._endGame = newVal;
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
			this._score += 10;
			this.render.food = null;
			this.render.foodRender();
			this.snake.increase();
			this.elementController.increaseScoreboard(this.score);
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
			this.elementController.gameOver();
		}
	}

	resetGame() {
		this.elementController.resetGame();
		this.score = 0;
		this.endGame = false;
		this.loop();
	}

	loop() {
		if (this.interval) clearInterval(this.interval);
		this.render.canvasRender();
		this.direction = this.temporaryDirection;
		this.snake.move(this.direction, this.render.blockSize);
		this.render.foodRender();
		this.render.gridRender();
		this.render.snakeRender();
		this.checkEndGame();
		this.checkPoint();
		if (!this.endGame) {
			this.interval = setTimeout(() => this.loop(), 300);
		}
	}
}
