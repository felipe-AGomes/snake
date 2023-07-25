export type SnakeBody = {
	x: number;
	y: number;
};

export type Direction = 'right' | 'left' | 'top' | 'bottom';

export class Snake {
	public _snakeBody: SnakeBody[] | null = null;

	get snakeBody() {
		return this._snakeBody;
	}

	set snakeBody(newValue: SnakeBody[] | null) {
		this._snakeBody = newValue;
	}

	create({
		canvasWidth,
		blockSize,
	}: {
		canvasWidth: number;
		blockSize: number;
	}) {
		this.snakeBody = [
			{ x: canvasWidth / 2 - blockSize, y: canvasWidth / 2 },
			{ x: canvasWidth / 2, y: canvasWidth / 2 },
		];
	}

	move(direction: Direction, blockSize: number) {
		if (!this.snakeBody) throw new Error('Snake ainda não foi criada');
		const snakeBody = [...this.snakeBody];
		const snakeHead = snakeBody[snakeBody.length - 1];
		snakeBody.shift();
		const directionMap = [
			{
				test: 'right' === direction,
				result: [...snakeBody, { ...snakeHead, x: snakeHead.x + blockSize }],
			},
			{
				test: 'top' === direction,
				result: [...snakeBody, { ...snakeHead, y: snakeHead.y - blockSize }],
			},
			{
				test: 'left' === direction,
				result: [...snakeBody, { ...snakeHead, x: snakeHead.x - blockSize }],
			},
			{
				test: 'bottom' === direction,
				result: [...snakeBody, { ...snakeHead, y: snakeHead.y + blockSize }],
			},
		];
		this.snakeBody =
			directionMap.find(({ test }) => test)?.result ?? this.snakeBody;
	}
}
