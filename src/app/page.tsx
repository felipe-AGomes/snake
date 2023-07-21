'use client';
import React, { useEffect, useRef, useState } from 'react';
import S from './home.module.css';
import { CanvasRenderer, Game, Snake } from '@/functions/snakeGame';
import { AiOutlinePlayCircle } from 'react-icons/ai';

export default function Home() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const scoreBoardRef = useRef<HTMLParagraphElement>(null);
	const endGameRef = useRef<HTMLDivElement>(null);
	const [reset, setReset] = useState(false);

	const makeGame = () => {
		const canvasRenderer = new CanvasRenderer(canvasRef);
		canvasRenderer.drawCanvas();

		const snake = new Snake(600, 30);
		const game = new Game(snake, scoreBoardRef, endGameRef);
		return { game };
	};
	const resetGame = () => {
		const { game } = makeGame();

		const runGame = () => {
			const canvas = canvasRef.current;
			if (!canvas) return;
			document.addEventListener('keydown', game.setDirection.bind(game));
			game.resetGame();
		};

		runGame();
	};

	useEffect(() => {
		const { game } = makeGame();

		const runGame = () => {
			const canvas = canvasRef.current;
			if (!canvas) return;
			document.addEventListener('keydown', game.setDirection.bind(game));
			game.startGame();
		};

		runGame();
		setReset(false);
	}, [reset]);

	return (
		<>
			<p
				ref={scoreBoardRef}
				className={S.score}
			>
				00
			</p>
			<div className={S.canvasContain}>
				<canvas
					ref={canvasRef}
					id='board'
					width='600'
					height='600'
				></canvas>
			</div>
			<div
				ref={endGameRef}
				className={S.endGame}
				style={{ display: 'none' }}
			>
				<h2>Fim de jogo</h2>
				<button
					className={S.resetGame}
					onClick={() => {
						resetGame();
					}}
				>
					<AiOutlinePlayCircle size={20} />
					Jogar Novamente
				</button>
			</div>
		</>
	);
}
