import { makeGameTests } from './Game.spec';

describe('Snake', () => {
	it('should create a new snake with initial values', () => {
		const { snake: sut, canvas, blockSize, initialSnakeBody } = makeGameTests();

		sut.create({ canvasWidth: canvas.width, blockSize });

		expect(sut.snakeBody).toEqual(initialSnakeBody);
	});

	it('should move the snake', () => {
		const { snake: sut, blockSize, initialSnakeBody } = makeGameTests();
		sut.snakeBody = initialSnakeBody;
		let snakeBody = [...initialSnakeBody];
		const snakeHead = sut.snakeBody[sut.snakeBody.length - 1];
		snakeBody.shift();
		snakeBody = [...snakeBody, { ...snakeHead, x: snakeHead.x + blockSize }];

		sut.move('right', 30);

		expect(sut.snakeBody).toEqual(snakeBody);
	});

	it('should move the snake', () => {
		const { snake: sut, blockSize, initialSnakeBody } = makeGameTests();
		sut.snakeBody = initialSnakeBody;
		let snakeBody = [...initialSnakeBody];
		const snakeHead = sut.snakeBody[sut.snakeBody.length - 1];
		snakeBody.shift();
		snakeBody = [...snakeBody, { ...snakeHead, y: snakeHead.y - blockSize }];

		sut.move('top', 30);

		expect(sut.snakeBody).toEqual(snakeBody);
	});

	it('should move the snake', () => {
		const { snake: sut, blockSize, initialSnakeBody } = makeGameTests();
		sut.snakeBody = initialSnakeBody;
		let snakeBody = [...initialSnakeBody];
		const snakeHead = sut.snakeBody[sut.snakeBody.length - 1];
		snakeBody.shift();
		snakeBody = [...snakeBody, { ...snakeHead, x: snakeHead.x - blockSize }];

		sut.move('left', 30);

		expect(sut.snakeBody).toEqual(snakeBody);
	});

	it('should move the snake', () => {
		const { snake: sut, blockSize, initialSnakeBody } = makeGameTests();
		sut.snakeBody = initialSnakeBody;
		let snakeBody = [...initialSnakeBody];
		const snakeHead = sut.snakeBody[sut.snakeBody.length - 1];
		snakeBody.shift();
		snakeBody = [...snakeBody, { ...snakeHead, y: snakeHead.y + blockSize }];

		sut.move('bottom', 30);

		expect(sut.snakeBody).toEqual(snakeBody);
	});

	it('should increase the snakeBody', () => {
		const { snake: sut, initialSnakeBody } = makeGameTests();
		sut.snakeBody = initialSnakeBody;

		sut.increase();

		expect(sut.snakeBody).toEqual([initialSnakeBody[1], ...initialSnakeBody]);
	});
});
