import { tensGenerator } from '../../../../src';

const randomizer = Math.random;

describe('Tens Value Generator', () => {
  it('should return a number', () => {
    const generator = tensGenerator({});
    expect(typeof generator({ randomizer })).toBe('number');
  });

  it('should return a number within the expected range', () => {
    const generator = tensGenerator({});
    const value = generator({ randomizer });

    expect(value).toBeGreaterThanOrEqual(10);
    expect(value).toBeLessThanOrEqual(99);
  });
});
