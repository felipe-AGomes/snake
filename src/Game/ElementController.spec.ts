import { makeGameTests } from './Game.spec';

describe('ElementController', () => {
	describe('increaseScoreboard', () => {
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
	});

	describe('resetGame', () => {
		it('should reset the score when sut.resetGame is called', () => {
			const { elementController: sut } = makeGameTests();
			sut.gameOverElement.style.display = 'flex';

			sut.resetGame();

			expect(sut.gameOverElement.style.display).toBe('none');
		});
	});

	describe('gameOver', () => {
		it('should set display to "flex" when the game is over', () => {
			const { elementController: sut } = makeGameTests();

			sut.gameOver();

			expect(sut.gameOverElement.style.display).toBe('flex');
		});
	});
});
