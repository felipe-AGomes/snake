export class ElementController {
	constructor(
		public scoreElement: HTMLParagraphElement,
		public gameOverElement: HTMLDivElement,
	) {}
	increaseScoreboard(score: number) {
		this.scoreElement.innerText = `${score}`;
	}

	gameOver() {
		this.gameOverElement.style.display = 'flex';
	}
}
