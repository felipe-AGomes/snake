'use client';

import { useEffect, useRef, useState } from 'react';
import S from './home.module.css';

type DirectionType = 'right' | 'left' | 'top' | 'bottom';
type KeyType = 'ArrowLeft' | 'ArrowRight' | 'ArrowDown' | 'ArrowUp';

const makeSnake = (ctx: CanvasRenderingContext2D) => {
	const canvasSize = 600;
	const size = 30;
	let loopTimeout: NodeJS.Timeout;
	const snake = [
		{ x: 30, y: 30 },
		{ x: 60, y: 30 },
		{ x: 90, y: 30 },
		{ x: 120, y: 30 },
		{ x: 120, y: 60 },
	];

	let direction: DirectionType;

	const drawSnake = () => {
		ctx.clearRect(0, 0, canvasSize, canvasSize);
		snake.forEach(({ x, y }, index) => {
			if (index === snake.length - 1) {
				ctx.fillStyle = 'gray';
				ctx.fillRect(x, y, size, size);
				return;
			}
			ctx.fillStyle = 'white';
			ctx.fillRect(x, y, size, size);
		});
	};

	const setDirection = ({ key }: KeyboardEvent) => {
		if (key === 'ArrowUp' && direction !== 'bottom') {
			direction = 'top';
		}
		if (key === 'ArrowDown' && direction !== 'top') {
			direction = 'bottom';
		}
		if (key === 'ArrowRight' && direction !== 'left') {
			direction = 'right';
		}
		if (key === 'ArrowLeft' && direction !== 'right') {
			direction = 'left';
		}
	};

	const moveSnake = () => {
		if (!direction) return;
		const snakeHeader = snake[snake.length - 1];
		const getSnakePosition = {
			top: { x: snakeHeader.x, y: snakeHeader.y - size },
			bottom: { x: snakeHeader.x, y: snakeHeader.y + size },
			left: { x: snakeHeader.x - size, y: snakeHeader.y },
			right: { x: snakeHeader.x + size, y: snakeHeader.y },
		};
		snake.shift();
		snake.push(getSnakePosition[direction]);
		drawSnake();
	};

	const gameLoop = () => {
		clearTimeout(loopTimeout);

		moveSnake();

		loopTimeout = setTimeout(() => {
			gameLoop();
		}, 100);
	};

	const startGame = () => {
		drawSnake();
		gameLoop();
	};

	return {
		startGame,
		setDirection,
	};
};
export default function Home() {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current as HTMLCanvasElement | null;
		const ctx = canvas?.getContext('2d');
		if (!ctx) return;
		const snake = makeSnake(ctx);

		document.addEventListener('keydown', snake.setDirection);
		snake.startGame();
	});

	return (
		<canvas
			ref={canvasRef}
			id={S.board}
			width='600'
			height='600'
		></canvas>
	);
}
