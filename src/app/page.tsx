'use client';

import { useEffect, useRef, useState } from 'react';
import S from './home.module.css';
import makeSnake from '@/functions/snakeGame';

export default function Home() {
	const canvasRef = useRef(null);
	const [endGame, setEndGame] = useState(false);

	const runGame = async () => {
		const canvas = canvasRef.current as HTMLCanvasElement | null;
		const ctx = canvas?.getContext('2d');
		if (!ctx) return;
		const snake = makeSnake(ctx);

		document.addEventListener('keydown', snake.setDirection);
		await snake.startGame();
		setEndGame(true);
	};

	useEffect(() => {
		runGame();
	});

	return (
		<>
			<canvas
				ref={canvasRef}
				id={S.board}
				width='600'
				height='600'
			></canvas>
			{endGame && <div>Olá, Marilene</div>}
		</>
	);
}
