import { orderItems } from '../../src';

describe('Ordering', () => {
  it('should return an array of the same items', async () => {
    const array = [1, 2, 3, 4];
    const ordered = orderItems(array);

    expect(ordered).toEqual([1, 2, 3, 4]);
  });

  it('should sort an array of numbers in ascending order', () => {
    const array = [3, 5, 1];
    const ordered = orderItems(array, 'asc');

    expect(ordered).toEqual([1, 3, 5]);
  });

  it('should sort an array of numbers in descending order', () => {
    const array = [3, 5, 1];
    const ordered = orderItems(array, 'desc');

    expect(ordered).toEqual([5, 3, 1]);
  });

  it('should sort an array of strings in ascending order', () => {
    const array = ['f', 'd', 'x', 'b'];
    const ordered = orderItems(array, 'asc');

    expect(ordered).toEqual(['b', 'd', 'f', 'x']);
  });

  it('should sort an array of strings in descending order', () => {
    const array = ['f', 'd', 'x', 'b'];
    const ordered = orderItems(array, 'desc');

    expect(ordered).toEqual(['x', 'f', 'd', 'b']);
  });

  it('should sort an array of mixed types in ascending order', () => {
    const array = ['x', 1, 'b', 5];
    const ordered = orderItems(array, 'asc');

    expect(ordered).toEqual([1, 5, 'b', 'x']);
  });

  it('should sort an array of mixed types in descending order', () => {
    const array = ['x', 1, 'b', 5];
    const ordered = orderItems(array, 'desc');

    expect(ordered).toEqual(['x', 'b', 5, 1]);
  });

  it('should deal with empty array', () => {
    const array = [] as number[];
    expect(() => orderItems(array, 'desc')).not.toThrow();
  });

  it('should throw on not array', () => {
    const array = 'not an array';

    // @ts-expect-error Intentionally trying to put something sortable but not an array
    expect(() => orderItems(array, 'asc')).toThrow(
      `Can't order - array is expected`,
    );
  });

  it('should throw on unrecognized ordering value', () => {
    const array = [1, 2, 3];

    // @ts-expect-error Intentionally trying unrecognized value as sort type
    expect(() => orderItems(array, 'something')).toThrow(
      `Can't order - unrecognized order: 'something'`,
    );
  });

  it('should throw on unexpected type', () => {
    const array = [{}, 'asdf', 1];

    // @ts-expect-error Intentionally trying unexpected type (empty object)
    expect(() => orderItems(array, 'asc')).toThrow(
      `Can't order - only strings and numbers are expected (object)`,
    );
  });
});
