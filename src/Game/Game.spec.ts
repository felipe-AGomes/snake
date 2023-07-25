const makeGame = () => {
	const ctxCanvas: any = {
		fillStyle: '',
		fillRect: jest.fn(),
	};
	const canvas: any = {
		getContext: jest.fn().mockReturnValueOnce(ctxCanvas),
		width: 600,
		height: 600,
	};
	const render = new Render(canvas);
	const controller = new Controller(render);
	const game = new Game(controller);
	return { render, controller, game, canvas };
};

export class Game {
	constructor(public controller: Controller) {}
	start() {
		this.controller.loop();
	}
}

describe('Game', () => {
	it('should call the this.loop()', () => {
		const { game: sut, controller } = makeGame();
		const spyControllerLoop = jest.spyOn(controller, 'loop');

		sut.start();

		expect(spyControllerLoop).toBeCalledTimes(1);
	});
});

export class Controller {
	constructor(public render: Render) {}
	loop() {
		this.render.canvasRender();
	}
}

describe('Controller', () => {
	it('should call the rendre.canvasRender()', () => {
		const { controller: sut, render } = makeGame();

		const spyRenderCanvas = jest.spyOn(render, 'canvasRender');

		sut.loop();

		expect(spyRenderCanvas).toBeCalledTimes(1);
	});
});

export class Render {
	public ctx: CanvasRenderingContext2D;
	constructor(public canvas: HTMLCanvasElement) {
		this.canvas = canvas;

		const ctx = canvas.getContext('2d');
		if (!ctx) {
			throw new Error('ctx não intanciado');
		}
		this.ctx = ctx;
	}

	canvasRender() {
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

describe('Render', () => {
	it('should set the fillStyle to "black"', () => {
		const { render: sut } = makeGame();

		sut.canvasRender();

		expect(sut.ctx?.fillStyle).toBe('black');
	});

	it('should call the method fillRect(0, 0, 600, 600)', () => {
		const { render: sut, canvas } = makeGame();

		sut.canvasRender();

		expect(sut.ctx?.fillRect).toHaveBeenCalledWith(
			0,
			0,
			canvas.width,
			canvas.height,
		);
	});
});
