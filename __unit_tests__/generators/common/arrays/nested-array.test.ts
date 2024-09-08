import { getDefaultEcosystem, nestedArrayGenerator } from '../../../../src';

const randomizer = Math.random;
const ecosystem = getDefaultEcosystem();
const definition = '!const-test';

describe('nested array', () => {
  it('should generate a non-empty array', () => {
    const generator = nestedArrayGenerator({
      ecosystem,
      definition,
      minItems: 2,
      maxItems: 5,
    });

    const generated = generator({ randomizer }) as string[];

    expect(generated.length).toBeGreaterThanOrEqual(2);
    expect(generated.length).toBeLessThanOrEqual(5);
  });

  it('should generate an array', () => {
    const generator = nestedArrayGenerator({
      ecosystem,
      definition,
      minItems: 2,
      maxItems: 5,
    });

    const generated = generator({ randomizer }) as string[];

    expect(Array.isArray(generated)).toBe(true);
  });

  it('should throw on missing definition', () => {
    expect(() =>
      nestedArrayGenerator({
        ecosystem,
        minItems: 2,
        maxItems: 5,
      }),
    ).toThrow(
      `Can't generate a nested array - 'definition' is a required property`,
    );
  });

  it('should throw on missing maxItems property', () => {
    expect(() =>
      nestedArrayGenerator({
        ecosystem,
        definition,
        minItems: 2,
      }),
    ).toThrow(
      `Can't generate a nested array - 'maxItems' is a required property`,
    );
  });

  it('should throw on minItems > maxItems', () => {
    expect(() =>
      nestedArrayGenerator({
        ecosystem,
        definition,
        minItems: 2,
        maxItems: 1,
      }),
    ).toThrow(
      `Can't generate a nested array - 'minItems' must be less or equal to 'maxItems' (2 > 1)`,
    );
  });

  it('should throw on minItems is negative', () => {
    expect(() =>
      nestedArrayGenerator({
        ecosystem,
        definition,
        minItems: -2,
        maxItems: 1,
      }),
    ).toThrow(
      `Can't generate a nested array - both 'minItems' and 'maxItems' must be positive numbers`,
    );
  });

  it('should throw on both being negative', () => {
    expect(() =>
      nestedArrayGenerator({
        ecosystem,
        definition,
        minItems: -2,
        maxItems: -1,
      }),
    ).toThrow(
      `Can't generate a nested array - both 'minItems' and 'maxItems' must be positive numbers`,
    );
  });
});
