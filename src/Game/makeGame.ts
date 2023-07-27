import { GameController } from './GameController';
import { ElementController } from './ElementController';
import { Game } from './Game';
import { Render } from './Render';
import { Snake } from './Snake';

export const makeGame = (
	canvas: HTMLCanvasElement,
	blockSize: number,
	scoreElement: HTMLParagraphElement,
) => {
	const elementController = new ElementController(scoreElement);
	const snake = new Snake();
	const render = new Render(canvas, blockSize, snake);
	const gameController = new GameController(render, snake, elementController);
	const game = new Game(gameController);
	return { render, gameController, game, canvas: canvas, snake, blockSize };
};
