export class ElementController {
	constructor(public scoreElement: HTMLParagraphElement) {}
	increaseScoreboard(score: number) {
		this.scoreElement.innerText = `${score}`;
	}

	gameOver() {}
}
