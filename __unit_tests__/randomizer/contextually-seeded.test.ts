import { contextuallySeededRandomizer } from '../../src';

const defaultContext = { clientContext: { seed: 3 } };

describe('Contextually Seeded randomizer', () => {
  it('should generate a float number', () => {
    const randomizer = contextuallySeededRandomizer();

    const value = randomizer(defaultContext);

    // Verify it's a number
    expect(typeof value).toBe('number');

    // Verify it's a finite number
    expect(Number.isFinite(value)).toBe(true);

    // Verify it's not an integer
    expect(Number.isInteger(value)).toBe(false);
  });

  it('should generate a float within range of [0, 1]', () => {
    const randomizer = contextuallySeededRandomizer();

    const value = randomizer(defaultContext);

    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(1);
  });

  it('should generate the same number with the same context', () => {
    const randomizer = contextuallySeededRandomizer();

    const value1 = randomizer(defaultContext);
    const value2 = randomizer(defaultContext);

    expect(value1).toBe(value2);
  });

  it('should generate a different value for the different context', () => {
    const randomizer = contextuallySeededRandomizer();

    const value1 = randomizer(defaultContext);
    const value2 = randomizer({ clientContext: { seed: 100 } });

    expect(value1).not.toBe(value2);
  });

  it('should throw on missing context', () => {
    const randomizer = contextuallySeededRandomizer();

    expect(() => randomizer()).toThrow(
      `Can't generate a contextually seeded random number - context or context.clientContext is missing`,
    );
  });

  it('should throw on missing clientContext', () => {
    const randomizer = contextuallySeededRandomizer();

    expect(() => randomizer({})).toThrow(
      `Can't generate a contextually seeded random number - context or context.clientContext is missing`,
    );
  });

  it('should throw on missing seed property in context', () => {
    const randomizer = contextuallySeededRandomizer();

    expect(() => randomizer({ clientContext: {} })).toThrow(
      `Can't generate a contextually seeded random number - missing property 'seed'`,
    );
  });

  it('should throw on seed not being a number', () => {
    const randomizer = contextuallySeededRandomizer();

    expect(() => randomizer({ clientContext: { seed: 'NaN' } })).toThrow(
      `Can't generate a contextually seeded random number - property 'seed' must be of type number`,
    );
  });
});
