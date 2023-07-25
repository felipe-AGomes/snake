import { Controller } from './Controller';
import { Game } from './Game';
import { Render } from './Render';
import { Snake } from './Snake';

export const makeGame = (canvas: HTMLCanvasElement, blockSize: number) => {
	const snake = new Snake();
	const render = new Render(canvas, blockSize, snake);
	const controller = new Controller(render, snake);
	const game = new Game(controller);
	return { render, controller, game, canvas: canvas, snake, blockSize };
};
