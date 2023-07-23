export interface IUtil {
	randomNumberBetween(min: number, max: number): number;
	randomNumberUpTo(value: number): number;
}

export class Util implements IUtil {
	public randomNumberBetween(min: number, max: number): number {
		return Math.round(Math.random() * (max - min)) + min;
	}

	public randomNumberUpTo(value: number): number {
		return Math.round(Math.random() * value);
	}
}
