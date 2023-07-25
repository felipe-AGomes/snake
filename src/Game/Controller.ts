import { Render } from './Render';
import { Direction, Snake } from './Snake';

type KeyBoardMap = { test: string; result: Direction };

export class Controller {
	public direction: Direction = 'right';
	constructor(public render: Render, public snake: Snake) {}

	keyboardListener({ key }: KeyboardEvent) {
		const keyboardMap: KeyBoardMap[] = [
			{ test: 'arrowUp', result: 'top' },
			{ test: 'arrowDown', result: 'bottom' },
			{ test: 'arrowRight', result: 'right' },
			{ test: 'arrowLeft', result: 'left' },
		];

		this.direction =
			keyboardMap.find(({ test }) => test === key)?.result ?? this.direction;
	}

	loop() {
		this.render.canvasRender();
		this.render.snakeRender();
		this.render.gridRender();
		this.snake.move(this.direction, this.render.blockSize);
		this.render.snakeRender();
		setTimeout(() => this.loop(), 300);
	}
}
