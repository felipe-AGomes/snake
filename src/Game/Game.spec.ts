import { makeGame } from './makeGame';

const mockCanvas = document.createElement('canvas');

export const makeGameTests = () => {
	const game = makeGame(mockCanvas, 30);
	const { canvas, blockSize } = game;
	const initialSnakeBody = [
		{ x: canvas.width / 2 - blockSize, y: canvas.width / 2 },
		{ x: canvas.width / 2, y: canvas.width / 2 },
	];
	return { ...game, initialSnakeBody };
};

describe('Game', () => {
	it('should call the this.loop()', () => {
		const { game: sut, controller } = makeGameTests();
		const spyControllerLoop = jest.spyOn(controller, 'loop');

		sut.start();

		expect(spyControllerLoop).toBeCalledTimes(1);
	});
});
