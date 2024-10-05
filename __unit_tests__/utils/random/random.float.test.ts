import { basicRandomizer, randomFloat } from '../../../src';

const randomizer = basicRandomizer();

describe('randomFloat function', () => {
  it('should generate a random float number within a [0, 1] range', () => {
    for (let index = 0; index < 100; index++) {
      const value = randomFloat(randomizer, 0, 5);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(5);
    }
  });

  it('should generate a float number', () => {
    const value = randomFloat(randomizer, 0, 1);

    expect(typeof value).toBe('number');

    // In VERY rare cases, 0 might occur -> this test fails
    expect(Number.isInteger(value)).toBe(false);
  });
});
