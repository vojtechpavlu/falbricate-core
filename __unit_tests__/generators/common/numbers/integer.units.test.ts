import { unitsGenerator } from '../../../../src';

const randomizer = Math.random;

describe('Units Value Generator', () => {
  it('should return a number', () => {
    const generator = unitsGenerator({});
    expect(typeof generator({ randomizer })).toBe('number');
  });

  it('should return a number within the expected range', () => {
    const generator = unitsGenerator({});
    const value = generator({ randomizer });

    expect(value).toBeGreaterThan(0);
    expect(value).toBeLessThanOrEqual(9);
  });
});
