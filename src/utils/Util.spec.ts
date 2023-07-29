import { Util } from './Util';

const mockCanvas = document.createElement('canvas');

describe('Util', () => {
	describe('randomColor', () => {
		it('should return a random rgb color', () => {
			const result = Util.randomColor();

			expect(result).toMatch(/rgb\(\d{0,3},\d{0,3},\d{0,3}\)/);
		});
	});

	describe('randomValueBetween', () => {
		it('should return a value between', () => {
			const result = Util.randomValueBetween(100, 155);

			expect(result).toBeGreaterThan(99);
			expect(result).toBeLessThan(155);
		});
	});

	describe('randomNumberUpTo', () => {
		it('should return a random number up to', () => {
			const result = Util.randomNumberUpTo(600);

			expect(result).toBeLessThan(600);
			expect(result).toBeGreaterThan(0);
		});
	});

	describe('randomCoordinates', () => {
		it('should return a array with two numbers', () => {
			const result = Util.randomCoordinates({
				canvasWidth: mockCanvas.width,
				blockSize: 30,
			});

			expect(result).toHaveLength(2);
			expect(result[0]).toBeGreaterThan(0);
		});
	});
});
