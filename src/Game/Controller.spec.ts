import { makeGameTests } from './Game.spec';

describe('Controller', () => {
	it('should call the render.canvasRender()', () => {
		const { controller: sut, render } = makeGameTests();

		const spyRenderCanvas = jest.spyOn(render, 'canvasRender');

		sut.loop();

		expect(spyRenderCanvas).toHaveBeenCalled();
	});

	it('should call the render.snake()', () => {
		const { controller: sut, render } = makeGameTests();

		const spyRenderSnakeRender = jest.spyOn(render, 'snakeRender');

		sut.loop();

		expect(spyRenderSnakeRender).toHaveBeenCalled();
	});

	it('should call the render.snakeRender()', () => {
		const { controller: sut, render } = makeGameTests();
		const spyRenderSnakeRender = jest.spyOn(render, 'snakeRender');

		sut.loop();

		expect(spyRenderSnakeRender).toHaveBeenCalled();
	});

	it('should call the render.gridRender', () => {
		const { controller: sut, render } = makeGameTests();
		const spyRenderSnakeRender = jest.spyOn(render, 'gridRender');

		sut.loop();

		expect(spyRenderSnakeRender).toHaveBeenCalled();
	});

	it('should call the snake.move', () => {
		const { controller: sut, snake } = makeGameTests();
		const spySnakeMove = jest.spyOn(snake, 'move');

		sut.loop();

		expect(spySnakeMove).toHaveBeenCalled();
	});

	it('property direction must be "top"', () => {
		const { controller: sut } = makeGameTests();
		let mockKeyBoardEvent: any = {
			key: 'arrowUp',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.direction).toBe('top');
	});

	it('property direction must be "right"', () => {
		const { controller: sut } = makeGameTests();
		let mockKeyBoardEvent: any = {
			key: 'arrowRight',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.direction).toBe('right');
	});

	it('property direction must be "bottom"', () => {
		const { controller: sut } = makeGameTests();
		let mockKeyBoardEvent: any = {
			key: 'arrowDown',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.direction).toBe('bottom');
	});

	it('property direction must be "left"', () => {
		const { controller: sut } = makeGameTests();
		let mockKeyBoardEvent: any = {
			key: 'arrowLeft',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.direction).toBe('left');
	});
});
