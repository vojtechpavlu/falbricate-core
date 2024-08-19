import { integerGenerator, seededRandomizer } from '../../../../src';

describe('Integer Value Generator Factory', () => {
  it('should throw on not given max', () => {
    expect(() => integerGenerator({})).toThrow(
      `Property 'max' is required for integer value generator`,
    );
  });

  it('should throw on max < min', () => {
    const config = { min: 5, max: 4 };

    expect(() => integerGenerator(config)).toThrow(
      `Maximum must be greater or equal to minimum for integer value generator to work`,
    );
  });

  it('should not throw on missing min property', () => {
    const config = { max: 100 };

    expect(() => integerGenerator(config)).not.toThrow();
  });
});

describe('Integer Value Generator', () => {
  it('should generate an integer', () => {
    const config = { max: 1 };

    const generator = integerGenerator(config);
    const randomizer = seededRandomizer({ seed: 1 });

    expect(typeof generator({ randomizer })).toBe('number');

    expect(Number.isInteger(generator({ randomizer }))).toBe(true);
  });

  it('should generate a number within a range', () => {
    const config = { max: 5 };

    const generator = integerGenerator(config);
    const randomizer = seededRandomizer({ seed: 1 });

    for (let index = 0; index < 100; index++) {
      const generatedNumber = generator({ randomizer });
      expect(generatedNumber).toBeGreaterThanOrEqual(0);
      expect(generatedNumber).toBeLessThanOrEqual(5);
    }
  });
});
