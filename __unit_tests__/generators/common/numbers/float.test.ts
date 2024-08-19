import { floatGenerator, seededRandomizer } from '../../../../src';

describe('Integer Value Generator Factory', () => {
  it('should throw on not given max', () => {
    expect(() => floatGenerator({}))
      .toThrow(`Property 'max' is required for float value generator`);
  });

  it('should throw on max < min', () => {
    const config = { min: 5, max: 4 };

    expect(() => floatGenerator(config))
      .toThrow(`Maximum must be greater or equal to minimum for float value generator to work`);
  });

  it('should not throw on missing min property', () => {
    const config = { max: 100 };

    expect(() => floatGenerator(config)).not.toThrow();
  });
});

describe('Integer Value Generator', () => {
  it('should generate a float', () => {
    const config = { max: 1 };

    const generator = floatGenerator(config);
    const randomizer = seededRandomizer({ seed: 1 });

    expect(typeof generator({ randomizer }))
      .toBe('number');

    expect(Number.isInteger(generator({ randomizer })))
      .toBe(false);
  });

  it('should generate a number within a range', () => {
    const config = { max: 5 };

    const generator = floatGenerator(config);
    const randomizer = seededRandomizer({ seed: 1 });

    for (let index = 0; index < 100; index++) {
      const generatedNumber = generator({ randomizer });
      expect(generatedNumber).toBeGreaterThanOrEqual(0);
      expect(generatedNumber).toBeLessThanOrEqual(5);
    }
  });

  it('should generate a number within a range (with min specified)', () => {
    const config = { min: 4, max: 5 };

    const generator = floatGenerator(config);
    const randomizer = seededRandomizer({ seed: 1 });

    for (let index = 0; index < 100; index++) {
      const generatedNumber = generator({ randomizer });
      expect(generatedNumber).toBeGreaterThanOrEqual(4);
      expect(generatedNumber).toBeLessThanOrEqual(5);
    }
  });
});
