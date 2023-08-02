'use client';
import { generateDigitalSignature } from 'assinatura-digital';
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
			scoreElement,
			gameOverElement,
		);
		document.addEventListener(
			'keydown',
			gameController.keyboardListener.bind(gameController),
		);
		const digitalSignature = generateDigitalSignature(
			'felipe-dev',
			'falmeidagomes13@gmail.com',
			'Bem-vindo ao meu site! Sinta-se à vontade para explorar e desenvolver com paixão!',
		);
		console.log(...digitalSignature);
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
