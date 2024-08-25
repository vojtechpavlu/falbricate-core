import { thousandsGenerator } from '../../../../src';

const randomizer = Math.random;

describe('Thousands Value Generator', () => {
  it('should return a number', () => {
    const generator = thousandsGenerator({});
    expect(typeof generator({ randomizer })).toBe('number');
  });

  it('should return a number within the expected range', () => {
    const generator = thousandsGenerator({});
    const value = generator({ randomizer });

    expect(value).toBeGreaterThan(1000);
    expect(value).toBeLessThanOrEqual(9999);
  });
});
