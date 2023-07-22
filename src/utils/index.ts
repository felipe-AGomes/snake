export class Util {
	static randomNumberBetween(min: number, max: number) {
		return Math.round(Math.random() * (max - min)) + min;
	}

	static randomNumberUpTo(value: number) {
		return Math.round(Math.random() * value);
	}
}
