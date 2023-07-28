import { makeGameTests } from './Game.spec';

export const initialSnakePosition = [
	{ x: 30, y: 0 },
	{ x: 0, y: 0 },
];

export const foodWinPosition = { x: 0, y: 0, color: '#fff' };

describe('GameControllerller', () => {
	it('should call the render.canvasRender()', () => {
		const { gameController: sut } = makeGameTests();
		const spyCanvasRender = jest.spyOn(sut.render, 'canvasRender');

		sut.loop();

		expect(spyCanvasRender).toHaveBeenCalled();
	});

	it('should call the render.snakeRender()', () => {
		const { gameController: sut } = makeGameTests();
		const spySnakeRender = jest.spyOn(sut.render, 'snakeRender');

		sut.loop();

		expect(spySnakeRender).toHaveBeenCalled();
	});

	it('should call the render.gridRender', () => {
		const { gameController: sut } = makeGameTests();
		const spyGridRender = jest.spyOn(sut.render, 'gridRender');

		sut.loop();

		expect(spyGridRender).toHaveBeenCalled();
	});

	it('should call the render.foodRender', () => {
		const { gameController: sut } = makeGameTests();
		const spyFoodRender = jest.spyOn(sut.render, 'foodRender');

		sut.loop();

		expect(spyFoodRender).toHaveBeenCalled();
	});

	it('should call the checkEndGame', () => {
		const { gameController: sut } = makeGameTests();
		const spyCheckEndGame = jest.spyOn(sut, 'checkEndGame');

		sut.loop();

		expect(spyCheckEndGame).toHaveBeenCalled();
	});

	it('should set the "endGame" to true if the snake head is far from the wall', () => {
		const { gameController: sut } = makeGameTests();
		sut.snake.snakeBody = [
			{ x: 30, y: 0 },
			{ x: -30, y: 0 },
		];

		sut.checkEndGame();

		expect(sut.endGame).toBeTruthy();
	});

	it('should set the "endGame" to true if the snake head hits the body', () => {
		const { gameController: sut } = makeGameTests();
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
		const { gameController: sut } = makeGameTests();
		sut.snake.snakeBody = initialSnakePosition;

		sut.checkEndGame();

		expect(sut.endGame).toBeFalsy();
	});

	it('should call the method checkPoint', () => {
		const { gameController: sut } = makeGameTests();
		const spyCheckPoint = jest.spyOn(sut, 'checkPoint');

		sut.loop();

		expect(spyCheckPoint).toHaveBeenCalled();
	});

	it('should increment 10 point if snake header position is equal the food position', () => {
		const { gameController: sut } = makeGameTests();
		sut.snake.snakeBody = initialSnakePosition;
		sut.render.food = foodWinPosition;

		sut.checkPoint();

		expect(sut.score).toBe(10);
	});

	it('should increase the score to 20 points when make a point two moments', () => {
		const { gameController: sut } = makeGameTests();
		sut.snake.snakeBody = initialSnakePosition;
		sut.render.food = foodWinPosition;
		sut.checkPoint();
		sut.render.food = foodWinPosition;

		sut.checkPoint();

		expect(sut.score).toBe(20);
	});

	it('should reset the food when register the point', () => {
		const { gameController: sut } = makeGameTests();
		sut.snake.snakeBody = initialSnakePosition;
		sut.render.food = foodWinPosition;

		sut.checkPoint();

		expect(sut.render.food).not.toEqual(foodWinPosition);
	});

	it('should the render.foodRender when poit register', () => {
		const { gameController: sut } = makeGameTests();
		sut.snake.snakeBody = initialSnakePosition;
		sut.render.food = foodWinPosition;
		const spyRenderRegister = jest.spyOn(sut.render, 'foodRender');

		sut.checkPoint();

		expect(spyRenderRegister).toHaveBeenCalled();
	});

	it('should not reset the food when point not regisner', () => {
		const { gameController: sut } = makeGameTests();
		sut.snake.snakeBody = initialSnakePosition;
		sut.render.food = { x: 300, y: 30, color: '#fff' };

		sut.checkPoint();

		expect(sut.render.food).toEqual({ x: 300, y: 30, color: '#fff' });
	});

	it('should call the method snake.increase', () => {
		const { gameController: sut } = makeGameTests();
		sut.snake.snakeBody = initialSnakePosition;
		sut.render.food = foodWinPosition;
		const spySnakeIncrease = jest.spyOn(sut.snake, 'increase');

		sut.checkPoint();

		expect(spySnakeIncrease).toHaveBeenCalled();
	});

	it('should not increment point if snake header position is direfent the food position', () => {
		const { gameController: sut } = makeGameTests();
		sut.snake.snakeBody = initialSnakePosition;
		sut.render.food = { x: 60, y: 60, color: '#fff' };

		sut.checkPoint();

		expect(sut.score).toBe(0);
	});

	it('should call the snake.move', () => {
		const { gameController: sut } = makeGameTests();
		const spySnakeMove = jest.spyOn(sut.snake, 'move');

		sut.loop();

		expect(spySnakeMove).toHaveBeenCalled();
	});

	it('property direction must be "top"', () => {
		const { gameController: sut } = makeGameTests();
		let mockKeyBoardEvent: any = {
			key: 'ArrowUp',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.temporaryDirection).toBe('top');
	});

	it('property direction must be "right"', () => {
		const { gameController: sut } = makeGameTests();
		let mockKeyBoardEvent: any = {
			key: 'ArrowRight',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.direction).toBe('right');
	});

	it('property direction must be "bottom"', () => {
		const { gameController: sut } = makeGameTests();
		let mockKeyBoardEvent: any = {
			key: 'ArrowDown',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.temporaryDirection).toBe('bottom');
	});

	it('property direction must be "left"', () => {
		const { gameController: sut } = makeGameTests();
		sut.direction = 'top';
		let mockKeyBoardEvent: any = {
			key: 'ArrowLeft',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.temporaryDirection).toBe('left');
	});

	it('should not change direction if key is inverse of sut.direction', () => {
		const { gameController: sut } = makeGameTests();
		sut.direction = 'bottom';
		let mockKeyBoardEvent: any = {
			key: 'ArrowTop',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.direction).toBe('bottom');
	});

	it('should not change direction if key is inverse of sut.direction', () => {
		const { gameController: sut } = makeGameTests();
		sut.direction = 'top';
		let mockKeyBoardEvent: any = {
			key: 'ArrowDown',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.direction).toBe('top');
	});

	it('should not change direction if key is inverse of sut.direction', () => {
		const { gameController: sut } = makeGameTests();
		sut.direction = 'left';
		let mockKeyBoardEvent: any = {
			key: 'ArrowRight',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.direction).toBe('left');
	});

	it('should not change direction if key is inverse of sut.direction', () => {
		const { gameController: sut } = makeGameTests();
		let mockKeyBoardEvent: any = {
			key: 'ArrowLeft',
		};

		sut.keyboardListener(mockKeyBoardEvent);

		expect(sut.direction).toBe('right');
	});

	it('should call the element.increaseScoreboard', () => {
		const { gameController: sut } = makeGameTests();
		sut.snake.snakeBody = initialSnakePosition;
		sut.render.food = foodWinPosition;
		const spyIncreaseScoreboard = jest.spyOn(
			sut.elementController,
			'increaseScoreboard',
		);

		sut.checkPoint();

		expect(spyIncreaseScoreboard).toHaveBeenCalled();
	});

	it('should call the elementController.gameOver if the game ir over', () => {
		const { gameController: sut } = makeGameTests();
		const spyGameOver = jest.spyOn(sut.elementController, 'gameOver');
		sut.snake.snakeBody = [
			{ x: 0, y: 0 },
			{ x: -30, y: 0 },
		];

		sut.checkEndGame();

		expect(spyGameOver).toHaveBeenCalled();
	});

	it('should reset the score when sut.resetGame is called', () => {
		const { gameController: sut } = makeGameTests();
		sut.score = 10;

		sut.resetGame();

		expect(sut.score).toBe(0);
	});

	it('should ', () => {
		const { gameController: sut } = makeGameTests();
		const spyResetGame = jest.spyOn(sut.elementController, 'resetGame');

		sut.resetGame();

		expect(spyResetGame).toHaveBeenCalled();
	});

	it('should set property endGame to false', () => {
		const { gameController: sut } = makeGameTests();
		sut.endGame = true;

		sut.resetGame();

		expect(sut.endGame).toBe(false);
	});

	it('should call the gameController.loop', () => {
		const { gameController: sut } = makeGameTests();
		const spyLoop = jest.spyOn(sut, 'loop');

		sut.resetGame();

		expect(spyLoop).toHaveBeenCalled();
	});
});
