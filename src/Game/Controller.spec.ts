import { makeGameTests } from './Game.spec';

describe('Controller', () => {
	it('should call the render.canvasRender()', () => {
		const { controller: sut } = makeGameTests();

		const spyCanvasRender = jest.spyOn(sut.render, 'canvasRender');

		sut.loop();

		expect(spyCanvasRender).toHaveBeenCalled();
	});

	it('should call the render.snakeRender()', () => {
		const { controller: sut } = makeGameTests();
		const spySnakeRender = jest.spyOn(sut.render, 'snakeRender');

		sut.loop();

		expect(spySnakeRender).toHaveBeenCalled();
	});

	it('should call the render.gridRender', () => {
		const { controller: sut } = makeGameTests();
		const spyGridRender = jest.spyOn(sut.render, 'gridRender');

		sut.loop();

		expect(spyGridRender).toHaveBeenCalled();
	});

	it('should call the render.foodRender', () => {
		const { controller: sut } = makeGameTests();
		const spyFoodRender = jest.spyOn(sut.render, 'foodRender');

		sut.loop();

		expect(spyFoodRender).toHaveBeenCalled();
	});

	it('should call the checkEndGame', () => {
		const { controller: sut } = makeGameTests();
		const spyCheckEndGame = jest.spyOn(sut, 'checkEndGame');

		sut.loop();

		expect(spyCheckEndGame).toHaveBeenCalled();
	});

	it('should set the "endGame" to true if the snake head is far from the wall', () => {
		const { controller: sut } = makeGameTests();
		sut.snake.snakeBody = [
			{ x: 30, y: 0 },
			{ x: -30, y: 0 },
		];

		sut.checkEndGame();

		expect(sut.endGame).toBeTruthy();
	});

	it('should set the "endGame" to true if the snake head hits the body', () => {
		const { controller: sut } = makeGameTests();
		sut.snake.snakeBody = [
			{ x: 0, y: 0 },
			{ x: 30, y: 0 },
			{ x: 60, y: 0 },
			{ x: 30, y: 0 },
		];

		sut.checkEndGame();

		expect(sut.endGame).toBeTruthy();
	});

	it('should not change "endGame" if the snake head is in the canvas', () => {
		const { controller: sut } = makeGameTests();
		sut.snake.snakeBody = [
			{ x: 30, y: 0 },
			{ x: 0, y: 0 },
		];

		sut.checkEndGame();

		expect(sut.endGame).toBeFalsy();
	});

	it('should call the method checkPoint', () => {
		const { controller: sut } = makeGameTests();
		const spyCheckPoint = jest.spyOn(sut, 'checkPoint');

		sut.loop();

		expect(spyCheckPoint).toHaveBeenCalled();
	});

	it('should increment 10 point if snake header position is equal the food position', () => {
		const { controller: sut } = makeGameTests();
		sut.snake.snakeBody = [
			{ x: 30, y: 0 },
			{ x: 0, y: 0 },
		];
		sut.render.food = { x: 0, y: 0, color: '#fff' };

		sut.checkPoint();

		expect(sut.score).toBe(10);
	});

	it('should call the method snake.increase', () => {
		const { controller: sut } = makeGameTests();
		sut.snake.snakeBody = [
			{ x: 30, y: 0 },
			{ x: 0, y: 0 },
		];
		sut.render.food = { x: 0, y: 0, color: '#fff' };
		const spySnakeIncrease = jest.spyOn(sut.snake, 'increase');

		sut.checkPoint();

		expect(spySnakeIncrease).toHaveBeenCalled();
	});

	it('should not increment point if snake header position is direfent the food position', () => {
		const { controller: sut } = makeGameTests();
		sut.snake.snakeBody = [
			{ x: 30, y: 0 },
			{ x: 0, y: 0 },
		];
		sut.render.food = { x: 60, y: 60, color: '#fff' };

		sut.checkPoint();

		expect(sut.score).toBe(0);
	});

	it('should call the snake.move', () => {
		const { controller: sut } = makeGameTests();
		const spySnakeMove = jest.spyOn(sut.snake, 'move');

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
