import { foodWinPosition, initialSnakePosition } from './GameController.spec';
import { makeGameTests } from './Game.spec';

describe('ElementController', () => {
	it('should increase the scoreelement when make a point', () => {
		const { elementController: sut } = makeGameTests();

		sut.increaseScoreboard(10);

		expect(sut.scoreElement.innerText).toBe('10');
	});

	it('should increase the scoreelement to 20 points when make a point two moments', () => {
		const { elementController: sut } = makeGameTests();

		sut.increaseScoreboard(20);

		expect(sut.scoreElement.innerText).toBe('20');
	});

	it('should reset the score when sut.resetGame is called', () => {
		const { elementController: sut } = makeGameTests();
		sut.gameOverElement.style.display = 'flex';

		sut.resetGame();

		expect(sut.gameOverElement.style.display).toBe('none');
	});

	it('should set display to "flex" when the game is over', () => {
		const { elementController: sut } = makeGameTests();

		sut.gameOver();

		expect(sut.gameOverElement.style.display).toBe('flex');
	});
});
