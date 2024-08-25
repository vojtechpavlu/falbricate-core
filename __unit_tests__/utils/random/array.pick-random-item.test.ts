import { pickRandomItem } from '../../../src';

const randomizer = Math.random;

type Value = 'a' | 'b';

describe('pickRandomItem', () => {
  it('should return an item from the array', () => {
    const array: Value[] = ['a', 'b'];
    expect(array).toContain(pickRandomItem(randomizer, array));
  });

  it('should return all items from the array eventually', () => {
    const array: Value[] = ['a', 'b'];

    const results: { [key in Value]: number } = { a: 0, b: 0 };

    for (let index = 0; index < 100; index++) {
      const pick: Value = pickRandomItem(randomizer, array);
      results[pick] += 1;
    }

    // Strictly greater - at least once
    expect(results['a']).toBeGreaterThan(0);
    expect(results['b']).toBeGreaterThan(0);
  });

  it('should return an item from a single item array', () => {
    const array: Value[] = ['a'];

    expect(pickRandomItem(randomizer, array)).toBe('a');
  });

  it('should throw on undefined', () => {
    const array = undefined;

    // @ts-expect-error - Array is undefined
    expect(() => pickRandomItem(randomizer, array)).toThrow(
      `Can't pick an item - got empty value instead of array`,
    );
  });

  it('should throw on not array', () => {
    const array = 'not an array';

    // @ts-expect-error - Given item is not an array
    expect(() => pickRandomItem(randomizer, array)).toThrow(
      `Can't pick an item - array type is expected (got string)`,
    );
  });

  it('should throw on empty array', () => {
    const array: unknown[] = [];

    expect(() => pickRandomItem(randomizer, array)).toThrow(
      `Can't pick an item - given array is empty`,
    );
  });
});
