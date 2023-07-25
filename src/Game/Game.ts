import { Controller } from './Controller';

export class Game {
	constructor(public controller: Controller) {}
	start() {
		this.controller.loop();
	}
}
