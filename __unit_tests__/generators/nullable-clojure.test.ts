import { constantTrue, nullabilityClojure } from '../../src';

const randomizer = Math.random;

describe('Nullability clojure', () => {
  it('should return a Value generator (function)', () => {
    const generator = constantTrue({});

    const nullableGenerator = nullabilityClojure(generator, 0.5);

    expect(typeof nullableGenerator).toBe('function');
  });

  it('should return value generator returning the expected non-null value when P=0', () => {
    const generator = constantTrue({});

    const nullableGenerator = nullabilityClojure(generator, 0);

    expect(nullableGenerator({ randomizer })).toBe(true);
  });

  it('should return value generator returning the expected null-like value when P=1', () => {
    const generator = constantTrue({});

    const nullableGenerator = nullabilityClojure(generator, 1);

    expect(nullableGenerator({ randomizer })).toBeUndefined();
  });

  it('should return expected null-like value', () => {
    const generator = constantTrue({});

    const nullableGenerator = nullabilityClojure(
      generator,
      1,
      'n/a',
    );

    expect(nullableGenerator({ randomizer })).toBe('n/a');
  });

  it('should throw on probability out of range', () => {
    const generator = constantTrue({});

    expect(() => nullabilityClojure(generator, 100)).toThrow(
      `The probability must be within a range of [0, 1] (got 100)`,
    );
  });

  it('should throw on undefined probability', () => {
    const generator = constantTrue({});

    // @ts-expect-error expected number; getting undefined
    expect(() => nullabilityClojure(generator, undefined)) // eslint-disable-line unicorn/no-useless-undefined
      .toThrow(`Probability is a required parameter for Nullability Clojure`);
  });
});
