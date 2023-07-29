import { makeGameTests } from './Game.spec';
import { Snake } from './Snake';

describe('Snake', () => {
	describe('create', () => {
		it('should create a new snake with initial values', () => {
			const { snake: sut, canvas, blockSize, initialSnakeBody } = makeGameTests();

			sut.create({ canvasWidth: canvas.width, blockSize });

			expect(sut.snakeBody).toEqual(initialSnakeBody);
		});
	});

	describe('move', () => {
		it('should not move the snake', () => {
			const { snake: sut, blockSize, initialSnakeBody } = makeGameTests();
			sut.snakeBody = initialSnakeBody;

			sut.move('tab' as any, blockSize);
			expect(sut.snakeBody).toEqual(initialSnakeBody);
		});

		it('should move the snake', () => {
			const { snake: sut, blockSize, initialSnakeBody } = makeGameTests();
			sut.snakeBody = initialSnakeBody;
			let snakeBody = [...initialSnakeBody];
			const snakeHead = sut.snakeBody[sut.snakeBody.length - 1];
			snakeBody.shift();
			snakeBody = [...snakeBody, { ...snakeHead, x: snakeHead.x + blockSize }];

			sut.move('right', blockSize);

			expect(sut.snakeBody).toEqual(snakeBody);
		});

		it('should move the snake', () => {
			const { snake: sut, blockSize, initialSnakeBody } = makeGameTests();
			sut.snakeBody = initialSnakeBody;
			let snakeBody = [...initialSnakeBody];
			const snakeHead = sut.snakeBody[sut.snakeBody.length - 1];
			snakeBody.shift();
			snakeBody = [...snakeBody, { ...snakeHead, y: snakeHead.y - blockSize }];

			sut.move('top', blockSize);

			expect(sut.snakeBody).toEqual(snakeBody);
		});

		it('should move the snake', () => {
			const { snake: sut, blockSize, initialSnakeBody } = makeGameTests();
			sut.snakeBody = initialSnakeBody;
			let snakeBody = [...initialSnakeBody];
			const snakeHead = sut.snakeBody[sut.snakeBody.length - 1];
			snakeBody.shift();
			snakeBody = [...snakeBody, { ...snakeHead, x: snakeHead.x - blockSize }];

			sut.move('left', blockSize);

			expect(sut.snakeBody).toEqual(snakeBody);
		});

		it('should move the snake', () => {
			const { snake: sut, blockSize, initialSnakeBody } = makeGameTests();
			sut.snakeBody = initialSnakeBody;
			let snakeBody = [...initialSnakeBody];
			const snakeHead = sut.snakeBody[sut.snakeBody.length - 1];
			snakeBody.shift();
			snakeBody = [...snakeBody, { ...snakeHead, y: snakeHead.y + blockSize }];

			sut.move('bottom', blockSize);

			expect(sut.snakeBody).toEqual(snakeBody);
		});
	});

	describe('increase', () => {
		it('should to throw a error if the snake.snakeBody is null', () => {
			const { snake: sut } = makeGameTests();

			expect(() => {
				sut.increase();
			}).toThrow('Snake não renderizada');
		});

		it('should increase the snakeBody', () => {
			const { snake: sut, initialSnakeBody } = makeGameTests();
			sut.snakeBody = initialSnakeBody;

			sut.increase();

			expect(sut.snakeBody).toEqual([...initialSnakeBody, initialSnakeBody[1]]);
		});
	});

	describe('reset', () => {
		it('should return snakeBody to initial state', () => {
			const { snake: sut, initialSnakeBody, canvas, blockSize } = makeGameTests();
			sut.snakeBody = [...initialSnakeBody, { x: 60, y: 0 }];

			sut.reset({ canvasWidth: canvas.width, blockSize });

			expect(sut.snakeBody).toEqual(initialSnakeBody);
		});
	});
});
