import { makeGameTests } from './Game.spec';

describe('Controller', () => {
	it('should call the render.canvasRender()', () => {
		const { controller: sut, render } = makeGameTests();

		const spyCanvasRender = jest.spyOn(render, 'canvasRender');

		sut.loop();

		expect(spyCanvasRender).toHaveBeenCalled();
	});

	it('should call the render.snakeRender()', () => {
		const { controller: sut, render } = makeGameTests();
		const spySnakeRender = jest.spyOn(render, 'snakeRender');

		sut.loop();

		expect(spySnakeRender).toHaveBeenCalled();
	});

	it('should call the render.gridRender', () => {
		const { controller: sut, render } = makeGameTests();
		const spyGridRender = jest.spyOn(render, 'gridRender');

		sut.loop();

		expect(spyGridRender).toHaveBeenCalled();
	});

	it('should call the render.foodRender', () => {
		const { controller: sut, render } = makeGameTests();
		const spyFoodRender = jest.spyOn(render, 'foodRender');

		sut.loop();

		expect(spyFoodRender).toHaveBeenCalled();
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
			key: 'ArrowUp',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.temporaryDirection).toBe('top');
	});

	it('property direction must be "right"', () => {
		const { controller: sut } = makeGameTests();
		let mockKeyBoardEvent: any = {
			key: 'ArrowRight',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.direction).toBe('right');
	});

	it('property direction must be "bottom"', () => {
		const { controller: sut } = makeGameTests();
		let mockKeyBoardEvent: any = {
			key: 'ArrowDown',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.temporaryDirection).toBe('bottom');
	});

	it('property direction must be "left"', () => {
		const { controller: sut } = makeGameTests();
		sut.direction = 'top';
		let mockKeyBoardEvent: any = {
			key: 'ArrowLeft',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.temporaryDirection).toBe('left');
	});

	it('should not change direction if key is inverse of sut.direction', () => {
		const { controller: sut } = makeGameTests();
		sut.direction = 'bottom';
		let mockKeyBoardEvent: any = {
			key: 'ArrowTop',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.direction).toBe('bottom');
	});

	it('should not change direction if key is inverse of sut.direction', () => {
		const { controller: sut } = makeGameTests();
		sut.direction = 'top';
		let mockKeyBoardEvent: any = {
			key: 'ArrowDown',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.direction).toBe('top');
	});

	it('should not change direction if key is inverse of sut.direction', () => {
		const { controller: sut } = makeGameTests();
		sut.direction = 'left';
		let mockKeyBoardEvent: any = {
			key: 'ArrowRight',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.direction).toBe('left');
	});

	it('should not change direction if key is inverse of sut.direction', () => {
		const { controller: sut } = makeGameTests();
		let mockKeyBoardEvent: any = {
			key: 'ArrowLeft',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.direction).toBe('right');
	});
});
