export class ElementController {
	constructor(
		public scoreElement: HTMLParagraphElement,
		public gameOverElement: HTMLDivElement,
	) {}
	increaseScoreboard(score: number) {
		this.scoreElement.innerText = `${score === 0 ? score : ''}${score}`;
	}

	gameOver() {
		this.gameOverElement.style.display = 'flex';
	}

	resetGame() {
		this.gameOverElement.style.display = 'none';
	}
}
