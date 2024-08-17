import { basicRandomizer, randomInteger } from '../../../src';

const randomizer = basicRandomizer();

describe('randomInteger function', () => {
  it('should generate a random integer number within a [0, 1] range', () => {
    for (let index = 0; index < 100; index++) {
      const value = randomInteger(randomizer, 0, 5);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(5);
    }
  });

  it('should generate an integer number', () => {
    const value = randomInteger(randomizer, 0, 5);

    expect(typeof value).toBe('number');
    expect(Number.isInteger(value)).toBe(true);
  });
});
