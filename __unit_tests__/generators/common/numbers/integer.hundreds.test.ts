import { hundredsGenerator } from '../../../../src';

const randomizer = Math.random;

describe('Hundreds Value Generator', () => {
  it('should return a number', () => {
    const generator = hundredsGenerator({});
    expect(typeof generator({ randomizer })).toBe('number');
  });

  it('should return a number within the expected range', () => {
    const generator = hundredsGenerator({});
    const value = generator({ randomizer });

    expect(value).toBeGreaterThan(100);
    expect(value).toBeLessThanOrEqual(999);
  });
});
