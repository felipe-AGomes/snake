import { IUtil } from '../utils/index';
import {
	CanvasRender,
	Food,
	ICanvasRender,
	IFood,
	IMoveController,
	ISnake,
	MoveController,
	Snake,
} from './snakeGame';

const mockMoveController: jest.Mocked<IMoveController> = {
	getCurrentDirection: jest.fn().mockReturnValue('right'),
	setTemporaryDirection: jest.fn(),
};

const mockSnake: jest.Mocked<ISnake> = {
	moveSnake: jest.fn(),
	setInitialSnakePosition: jest.fn().mockImplementation(() => {
		mockSnake.snakeBody = [
			{
				x: 300,
				y: 300,
			},
			{
				x: 330,
				y: 300,
			},
		];
	}),
	snakeBody: [
		{
			x: 300,
			y: 300,
		},
		{
			x: 330,
			y: 300,
		},
	],
};

const mockUtil: jest.Mocked<IUtil> = {
	randomNumberBetween: jest.fn().mockReturnValue(155),
	randomNumberUpTo: jest.fn(),
};

const mockFood: jest.Mocked<IFood> = {
	food: null,
	generateFood: jest.fn(),
	generateRandomColor: jest.fn(),
	generateRandomPosition: jest.fn(),
};

describe('MoveController', () => {
	let sut: MoveController;
	let result: string | undefined;
	beforeEach(() => {
		sut = new MoveController();
	});

	afterEach(() => {
		result = undefined;
	});

	it('should insert the value of temporaryDirection into currentDirection and return the currentDirection', () => {
		sut.setTemporaryDirection({ key: 'ArrowDown' } as KeyboardEvent);
		result = sut.getCurrentDirection();

		expect(result).toBe('bottom');

		sut.setTemporaryDirection({ key: 'ArrowRight' } as KeyboardEvent);
		result = sut.getCurrentDirection();
		expect(result).toBe('right');
	});

	it('should not change the currentDirection if arrow is inverse of it', () => {
		sut.setTemporaryDirection({ key: 'ArrowDown' } as KeyboardEvent);
		result = sut.getCurrentDirection();

		expect(result).toBe('bottom');

		sut.setTemporaryDirection({ key: 'ArrowUp' } as KeyboardEvent);
		result = sut.getCurrentDirection();
		expect(result).toBe('bottom');
	});

	it('should do nothing if other key has been pressed', () => {
		sut.setTemporaryDirection({ key: 'ArrowDown' } as KeyboardEvent);
		result = sut.getCurrentDirection();

		expect(result).toBe('bottom');

		sut.setTemporaryDirection({ key: 'space' } as KeyboardEvent);
		result = sut.getCurrentDirection();
		expect(result).toBe('bottom');
	});
});

describe('Snake', () => {
	let sut: Snake;
	beforeEach(() => {
		sut = new Snake(mockMoveController);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should generate a snake with initial params', () => {
		sut.setInitialSnakePosition(600, 30);
		sut.moveSnake(30);

		expect(sut.snakeBody).toEqual([
			{
				x: 300,
				y: 300,
			},
			{
				x: 330,
				y: 300,
			},
		]);
	});

	it('should moveSnake to right position', () => {
		mockMoveController.getCurrentDirection.mockReturnValueOnce('left');

		sut.setInitialSnakePosition(600, 30);
		sut.moveSnake(30);

		expect(sut.snakeBody).toEqual([
			{
				x: 300,
				y: 300,
			},
			{
				x: 270,
				y: 300,
			},
		]);

		mockMoveController.getCurrentDirection.mockReturnValueOnce('bottom');

		sut.moveSnake(30);

		expect(sut.snakeBody).toEqual([
			{
				x: 270,
				y: 300,
			},
			{
				x: 270,
				y: 330,
			},
		]);

		mockMoveController.getCurrentDirection.mockReturnValueOnce('top');

		sut.moveSnake(30);

		expect(sut.snakeBody).toEqual([
			{
				x: 270,
				y: 330,
			},
			{
				x: 270,
				y: 300,
			},
		]);
	});
});

describe('Food', () => {
	let sut: Food;
	let result: any;

	beforeEach(() => {
		sut = new Food(mockSnake, mockUtil);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return a string with random params of rgb colors', () => {
		result = sut.generateRandomColor();

		expect(result).toMatch(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/);
	});

	it('should return a new food position aleatory', () => {
		mockUtil.randomNumberUpTo.mockReturnValueOnce(10).mockReturnValueOnce(5);
		result = sut.generateRandomPosition(600, 30);

		expect(result).toEqual({
			x: 300,
			y: 150,
		});
	});

	it('should not return a new food on same position as the snake', () => {
		mockUtil.randomNumberUpTo
			.mockReturnValueOnce(10)
			.mockReturnValueOnce(10)
			.mockReturnValueOnce(5)
			.mockReturnValueOnce(10);

		result = sut.generateRandomPosition(600, 30);

		expect(result).toEqual({ x: 150, y: 300 });
	});

	it('should change the food value to new food position', () => {
		mockUtil.randomNumberUpTo.mockReturnValueOnce(10).mockReturnValueOnce(5);

		sut.generateFood(600, 30);

		expect(sut.food).toEqual({ x: 300, y: 150, color: 'rgb(155, 155, 155)' });
	});
});

describe('CanvasRender', () => {
	let sut: ICanvasRender;
	let mockCanvas: HTMLCanvasElement;
	let mockCtx: CanvasRenderingContext2D;
	let result: any;

	beforeEach(() => {
		mockCanvas = document.createElement('canvas');
		mockCanvas.width = 600;
		mockCanvas.height = 600;
		mockCtx = mockCanvas.getContext('2d')!;
		sut = new CanvasRender(mockCanvas, mockCtx, 30, mockSnake, mockFood);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return the property size', () => {
		result = sut.size;

		expect(result).toBe(30);
	});

	it('should return the property canvasWidth', () => {
		result = sut.canvasWidth;

		expect(result).toBe(600);
	});

	it('should return the property canvasHeight', () => {
		result = sut.canvasHeight;

		expect(result).toBe(600);
	});

	it('should initialize the canvas', () => {
		const mockFillRect = jest.spyOn(mockCtx, 'fillRect');

		sut.createCanvas();

		expect(mockCtx.fillStyle).toBe('#000000');
		expect(mockFillRect).toHaveBeenCalledWith(
			0,
			0,
			mockCanvas.width,
			mockCanvas.height,
		);
	});

	it('should create a new Snake if she is not exists', () => {
		mockSnake.snakeBody = [];

		sut.snakeRender();

		expect(mockSnake.snakeBody).not.toEqual([]);
		expect(mockSnake.setInitialSnakePosition).toHaveBeenCalledTimes(1);
	});

	it('should render the snake correctly', () => {
		const mockFillStyle = jest.spyOn(mockCtx, 'fillRect');

		sut.snakeRender();

		expect(mockSnake.setInitialSnakePosition).toHaveBeenCalledTimes(0);
		expect(mockFillStyle).toHaveBeenNthCalledWith(1, 300, 300, 30, 30);
		expect(mockFillStyle).toHaveBeenNthCalledWith(2, 330, 300, 30, 30);
	});
});
