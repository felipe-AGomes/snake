'use client';
import React, { useEffect, useRef, useState } from 'react';
import S from './home.module.css';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import {
	CanvasRender,
	Game,
	MoveController,
	Snake,
} from '@/functions/snakeGame';

export default function Home() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const scoreBoardRef = useRef<HTMLParagraphElement>(null);
	const endGameRef = useRef<HTMLDivElement>(null);
	const [reset, setReset] = useState(false);

	useEffect(() => {
		const runGame = () => {
			const canvas = canvasRef.current;
			const ctx = canvas?.getContext('2d');
			const moveController = new MoveController();
			const snake = new Snake();
			const canvasRender = new CanvasRender(canvas!, ctx!, 30, snake);
			const game = new Game(canvasRender, snake, moveController);
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
				<button className={S.resetGame}>
					<AiOutlinePlayCircle size={20} />
					Jogar Novamente
				</button>
			</div>
		</>
	);
}
