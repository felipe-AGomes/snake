'use client';
import React, { useEffect, useRef, useState } from 'react';
import S from './home.module.css';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { Game } from '@/Game/Game';
import { makeGame } from '@/Game/makeGame';

export default function Home() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const scoreBoardRef = useRef<HTMLParagraphElement>(null);
	const endGameRef = useRef<HTMLDivElement>(null);
	const [game, setGame] = useState<Game | null>(null);

	game?.start();

	useEffect(() => {
		const canvas = canvasRef.current;
		const gameOverElement = endGameRef.current;
		const scoreElement = scoreBoardRef.current;
		if (!scoreElement || !canvas || !gameOverElement)
			throw new Error('Ref não instanciada');
		const { game, gameController } = makeGame(
			canvas,
			30,
			scoreElement,
			gameOverElement,
		);
		document.addEventListener(
			'keydown',
			gameController.keyboardListener.bind(gameController),
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
					width='300'
					height='300'
				></canvas>
			</div>
			<div
				ref={endGameRef}
				className={S.endGame}
				style={{ display: 'none' }}
			>
				<h2>Fim de jogo</h2>
				<button
					onClick={() => {
						game?.reset();
					}}
					className={S.resetGame}
				>
					<AiOutlinePlayCircle size={20} />
					Jogar Novamente
				</button>
			</div>
		</>
	);
}
