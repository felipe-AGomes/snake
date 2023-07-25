import { Render } from './Render';
import { Direction, Snake } from './Snake';

type KeyBoardMap = { test: boolean; result: Direction };

export class Controller {
	public _direction: Direction = 'right';
	public _temporaryDirection: Direction = 'right';
	public interval: NodeJS.Timeout | null = null;
	constructor(public render: Render, public snake: Snake) {}

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

	loop() {
		if (this.interval) clearInterval(this.interval);
		this.render.canvasRender();
		this.render.snakeRender();
		this.render.gridRender();
		this.snake.move(this.direction, this.render.blockSize);
		this.direction = this.temporaryDirection;
		this.render.snakeRender();
		this.interval = setTimeout(() => this.loop(), 300);
	}
}
