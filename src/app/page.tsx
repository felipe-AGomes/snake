'use client';
import React, { useEffect, useRef, useState } from 'react';
import S from './home.module.css';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { Game, makeGame } from '@/functions/snakeGame';

export default function Home() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const scoreBoardRef = useRef<HTMLParagraphElement>(null);
	const endGameRef = useRef<HTMLDivElement>(null);
	const [game, setGame] = useState<Game | null>(null);

	game?.startGame();

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext('2d');
		const endGameElement = endGameRef.current;
		const scoreElement = scoreBoardRef.current;
		if (!scoreElement || !ctx || !canvas || !endGameElement)
			throw new Error('Ref não instanciada');
		const { game, moveController } = makeGame(
			canvas,
			ctx,
			scoreElement,
			endGameElement,
		);
		document.addEventListener(
			'keydown',
			moveController.setCurrentDirection.bind(moveController),
		);
		setGame(game);
	}, []);

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
					onClick={() => game?.resetGame()}
					className={S.resetGame}
				>
					<AiOutlinePlayCircle size={20} />
					Jogar Novamente
				</button>
			</div>
		</>
	);
}
