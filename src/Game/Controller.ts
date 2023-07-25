import { Render } from './Render';
import { Direction, Snake } from './Snake';

export class Controller {
	public direction: Direction = 'right'
	constructor(public render: Render, public snake: Snake) {}
	loop() {
		this.render.canvasRender();
		this.render.snakeRender();
		this.render.gridRender();
		this.snake.move(this.direction, this.render.blockSize);
		
	}
}
