import { GameController } from './GameController';

export class Game {
	constructor(public gameController: GameController) {}
	start() {
		this.gameController.loop();
	}
}
