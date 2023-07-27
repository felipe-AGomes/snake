import { makeGame } from './makeGame';

const mockCanvas = document.createElement('canvas');
const mockScoreElement = document.createElement('p');
const mockElementGameOver = document.createElement('div');

export const makeGameTests = () => {
	const game = makeGame(mockCanvas, 30, mockScoreElement, mockElementGameOver);
	const { canvas, blockSize } = game;
	const initialSnakeBody = [
		{ x: canvas.width / 2 - blockSize, y: canvas.width / 2 },
		{ x: canvas.width / 2, y: canvas.width / 2 },
	];
	return { ...game, initialSnakeBody };
};

describe('Game', () => {
	it('should call the this.loop()', () => {
		const { game: sut } = makeGameTests();
		const spyControllerLoop = jest.spyOn(sut.gameController, 'loop');

		sut.start();

		expect(spyControllerLoop).toBeCalledTimes(1);
	});
});
