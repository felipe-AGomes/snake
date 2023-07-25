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

	create(canvas: HTMLCanvasElement, blockSize: number) {
		this.snakeBody = [
			{ x: canvas.width / 2 - blockSize, y: canvas.width / 2 },
			{ x: canvas.width / 2, y: canvas.width / 2 },
		];
	}

	move(direction: Direction, blockSize: number) {
		if (!this.snakeBody) throw new Error('Snake ainda não foi criada');
		const snakeBody = [...this.snakeBody];
		const snakeHead = snakeBody[snakeBody.length - 1];
		snakeBody.shift();
		const directionMap = [
			{
				test: 'right',
				result: [...snakeBody, { ...snakeHead, x: snakeHead.x + blockSize }],
			},
			{
				test: 'top',
				result: [...snakeBody, { ...snakeHead, y: snakeHead.y - blockSize }],
			},
			{
				test: 'left',
				result: [...snakeBody, { ...snakeHead, x: snakeHead.x - blockSize }],
			},
			{
				test: 'bottom',
				result: [...snakeBody, { ...snakeHead, y: snakeHead.y + blockSize }],
			},
		];
		this.snakeBody =
			directionMap.find(({ test }) => test === direction)?.result ??
			this.snakeBody;
	}
}
