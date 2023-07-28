import { GameController } from './GameController';

export class Game {
	constructor(public gameController: GameController) {}
	reset() {
		this.gameController.resetGame();
	}

	start() {
		this.gameController.loop();
	}
}
