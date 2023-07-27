import { foodWinPosition, initialSnakePosition } from './GameController.spec';
import { makeGameTests } from './Game.spec';

describe('ElementController', () => {
	it('should increase the scoreelement when make a point', () => {
		const { gameController: sut } = makeGameTests();
		sut.snake.snakeBody = initialSnakePosition;
		sut.render.food = foodWinPosition;

		sut.checkPoint();

		expect(sut.elementController.scoreElement.innerText).toBe('10');
	});

	it('should increase the scoreelement to 20 points when make a point two moments', () => {
		const { gameController: sut } = makeGameTests();
		sut.snake.snakeBody = initialSnakePosition;
		sut.render.food = foodWinPosition;
		sut.checkPoint();
		sut.render.food = foodWinPosition;

		sut.checkPoint();

		expect(sut.elementController.scoreElement.innerText).toBe('20');
	});
});
