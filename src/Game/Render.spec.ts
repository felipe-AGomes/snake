import { makeGameTests } from './Game.spec';

describe('Render', () => {
	it('should set the fillStyle to "#000000"', () => {
		const { render: sut } = makeGameTests();

		sut.canvasRender();

		expect(sut.ctx?.fillStyle).toBe('#000000');
	});

	it('should call the method fillRect(0, 0, 600, 600)', () => {
		const { render: sut, canvas } = makeGameTests();

		const spyCtxFillRect = jest.spyOn(sut.ctx, 'fillRect');

		sut.canvasRender();

		expect(spyCtxFillRect).toHaveBeenCalledWith(
			0,
			0,
			canvas.width,
			canvas.height,
		);
	});

	it('if snake.snakeBody is empty, should call the method snake.create', () => {
		const { render: sut, snake } = makeGameTests();
		const spySnakeCreate = jest.spyOn(snake, 'create');

		sut.snakeRender();

		expect(spySnakeCreate).toHaveBeenCalledTimes(1);
	});

	it('if snake.snakeBody is empty, shoud create a new snake', () => {
		const { render: sut, snake, initialSnakeBody } = makeGameTests();
		const spySnakeCreate = jest.spyOn(snake, 'create');

		sut.snakeRender();

		expect(spySnakeCreate).toHaveBeenCalledTimes(1);
		expect(snake.snakeBody).toEqual(initialSnakeBody);
	});

	it('if snake.snakeBody is not empty, should not be call snake.create', () => {
		const { render: sut, snake } = makeGameTests();
		const spySnakeCreate = jest.spyOn(snake, 'create');
		snake.snakeBody = [{ x: 30, y: 30 }];

		sut.snakeRender();

		expect(spySnakeCreate).not.toHaveBeenCalled();
	});

	it('should draw a snake', () => {
		const { render: sut } = makeGameTests();
		const spyCtxFillRect = jest.spyOn(sut.ctx, 'fillRect');

		sut.snakeRender();

		expect(spyCtxFillRect).toHaveBeenCalled();
	});

	it('should drwar a grid', () => {
		const { render: sut } = makeGameTests();

		sut.gridRender();

		expect(sut.ctx.fillStyle).toBe('#808080');
	});
});
