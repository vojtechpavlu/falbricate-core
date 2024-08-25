import { selectSample } from '../../../src';

const randomizer = Math.random;

describe('selectSample', () => {
  it('should return an array', () => {
    const array: number[] = [1, 2, 3, 4];
    const result = selectSample(randomizer, array, 2, 1);

    expect(Array.isArray(result)).toBe(true);
  });

  it('should return an array of expected length', () => {
    const array: number[] = [1, 2, 3, 4];
    const result = selectSample(randomizer, array, 2, 1);

    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result.length).toBeLessThanOrEqual(2);
  });

  it('should only consist of expected items', () => {
    const array: number[] = [1, 2, 3, 4];
    const result = selectSample(randomizer, array, 2, 1);

    for (const item of result) {
      expect(array.includes(item)).toBe(true);
    }
  });

  it('should reach the upper bound', () => {
    const array: number[] = [1, 2, 3, 4];

    let reached: number = 0;

    for (let index = 0; index < 100; index++) {
      const sample = selectSample(randomizer, array, 3, 1);
      if (sample.length === 3) {
        reached += 1;
      }
    }

    // It reached the upper bound at least once
    expect(reached).toBeGreaterThan(0);
  });

  it('should throw on undefined', () => {
    const array = undefined;

    // @ts-expect-error - Given undefined to test it out
    expect(() => selectSample(randomizer, array, 2, 1)).toThrow(
      `Can't make a sample - got empty value instead of array`,
    );
  });

  it('should throw on not array', () => {
    const array = 'not an array';

    // @ts-expect-error - Given string to test it out
    expect(() => selectSample(randomizer, array, 2, 1)).toThrow(
      `Can't make a sample - array type is expected (got string)`,
    );
  });

  it('should throw on not array', () => {
    const array: number[] = [];

    expect(() => selectSample(randomizer, array, 2, 1)).toThrow(
      `Can't make a sample - given array is empty`,
    );
  });

  it('should throw on maxItems < 1', () => {
    const array: number[] = [1, 2, 3, 4, 5, 6, 7, 9];

    expect(() => selectSample(randomizer, array, 0, 1)).toThrow(
      `Can't make a sample - 'maxItems' must be at least 1`,
    );
  });

  it('should throw on minItems < 0', () => {
    const array: number[] = [1, 2, 3, 4, 5, 6, 7, 9];

    expect(() => selectSample(randomizer, array, 3, -1)).toThrow(
      `Can't make a sample - 'minItems' must be at least 1`,
    );
  });

  it('should throw on maxItems < minItems', () => {
    const array: number[] = [1, 2, 3, 4, 5, 6, 7, 9];

    expect(() => selectSample(randomizer, array, 2, 3)).toThrow(
      `Can't make a sample - 'maxItems' must be greater or equal to 'minItems' (2 < 3)`,
    );
  });

  it('should throw on array.length < minItems', () => {
    const array: number[] = [1, 2];

    expect(() => selectSample(randomizer, array, 5, 4)).toThrow(
      `Can't make a sample - given array must have at least 4 (minItems)`,
    );
  });
});
