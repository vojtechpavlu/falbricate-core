import { shuffleArray } from '../../../src';

const randomizer = Math.random;

describe('shuffleArray', () => {
  it('should return an array of same length', () => {
    const array: number[] = [1, 2, 3, 4];
    expect(shuffleArray(randomizer, array).length).toBe(4);
  });

  it('should return a copy of an array', () => {
    const array: number[] = [1, 1, 1, 1];

    const shuffled = shuffleArray(randomizer, array);

    array[0] = 100;

    expect(shuffled[0]).toBe(1);
  });
});
