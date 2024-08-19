import { basicRandomizer } from '../../src';

describe('Basic randomizer', () => {
  it('should generate a float number', () => {
    const randomizer = basicRandomizer();
    const generated = randomizer();

    expect(typeof generated).toBe('number');
    expect(Number.isInteger(generated)).toBe(false);
  });

  it('should generate a float within range of [0, 1]', () => {
    const randomizer = basicRandomizer();
    const generated = randomizer();

    expect(generated).toBeGreaterThanOrEqual(0);
    expect(generated).toBeLessThanOrEqual(1);
  });
});
