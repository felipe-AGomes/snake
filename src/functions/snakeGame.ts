type DirectionType = 'right' | 'left' | 'top' | 'bottom';
type FoodType = {
	x: number;
	y: number;
};
type KeyTest = { test: boolean; direction: DirectionType };

export default function makeSnake(ctx: CanvasRenderingContext2D) {
	const canvasSize = 600;
	const size = 30;
	let loopTimeout: NodeJS.Timeout;
	const snake = [
		{ x: 270, y: 270 },
		{ x: 300, y: 270 },
	];
	let food: FoodType | null = null;
	let temporaryDirection: DirectionType;
	let direction: DirectionType;

	const randomFoodPosition = () => {
		const canvasLength = (canvasSize - size) / size;
		return Math.round(Math.random() * canvasLength) * size;
	};

	const drawFood = () => {
		ctx.fillStyle = 'yellow';
		if (!food) {
			food = { x: randomFoodPosition(), y: randomFoodPosition() };
			while (snake.find((snake) => snake.x === food?.x && snake.y === food?.y)) {
				food = { x: randomFoodPosition(), y: randomFoodPosition() };
			}
		}
		ctx.fillRect(food.x, food.y, size, size);
	};

	const drawSnake = () => {
		ctx.clearRect(0, 0, canvasSize, canvasSize);
		snake.forEach(({ x, y }, index) => {
			if (index === snake.length - 1) {
				ctx.fillStyle = 'gray';
				ctx.fillRect(x, y, size, size);
				return;
			}
			ctx.fillStyle = 'white';
			ctx.fillRect(x, y, size, size);
		});
	};

	const setDirection = ({ key }: KeyboardEvent) => {
		const directionMap: KeyTest[] = [
			{ test: key === 'ArrowUp' && direction !== 'bottom', direction: 'top' },
			{ test: key === 'ArrowDown' && direction !== 'top', direction: 'bottom' },
			{ test: key === 'ArrowRight' && direction !== 'left', direction: 'right' },
			{ test: key === 'ArrowLeft' && direction !== 'right', direction: 'left' },
		];
		temporaryDirection =
			directionMap.find(({ test }) => test)?.direction ?? direction;
	};

	const moveSnake = () => {
		direction = temporaryDirection;
		if (!direction) {
			drawSnake();
			return;
		}
		const snakeHeader = snake[snake.length - 1];
		const getSnakePosition = {
			top: { x: snakeHeader.x, y: snakeHeader.y - size },
			bottom: { x: snakeHeader.x, y: snakeHeader.y + size },
			left: { x: snakeHeader.x - size, y: snakeHeader.y },
			right: { x: snakeHeader.x + size, y: snakeHeader.y },
		};
		snake.shift();
		snake.push(getSnakePosition[direction]);
		drawSnake();
		drawFood();
	};

	const endGame = () => {
		alert('Aqui acabou!');
	};

	const gameLoop = () => {
		const snakeHeader = snake[snake.length - 1];
		const snakeBody = snake.slice(0, snake.length - 1);
		clearTimeout(loopTimeout);
		if (food && snakeHeader.x === food.x && snakeHeader.y === food.y) {
			snake.push(food);
			food = null;
		}
		if (
			snakeBody.find(
				(snakeBody) =>
					snakeBody.x === snakeHeader.x && snakeBody.y === snakeHeader.y,
			) ||
			snakeHeader.x >= canvasSize ||
			snakeHeader.y >= canvasSize ||
			snakeHeader.x < 0 ||
			snakeHeader.y < 0
		) {
			endGame();
			return;
		}
		moveSnake();

		loopTimeout = setTimeout(() => {
			gameLoop();
		}, 200);
	};

	const startGame = () => {
		gameLoop();
	};

	return {
		startGame,
		setDirection,
	};
}
