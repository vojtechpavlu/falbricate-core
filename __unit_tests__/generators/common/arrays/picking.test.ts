import { pickingGenerator } from '../../../../src';

const randomizer = Math.random;
const array = ['a', 'b', 'c'];

describe('picking generator', () => {
  it('should return an item of expected type', () => {
    const generator = pickingGenerator({ array });

    expect(typeof generator({ randomizer })).toBe('string');
  });

  it('should return an item from the array', () => {
    const generator = pickingGenerator({ array });

    expect(array).toContain(generator({ randomizer }));
  });

  it('should throw when given empty array', () => {
    expect(() => pickingGenerator({ array: [] })).toThrow(
      `Can't pick any item - the given array is empty`,
    );
  });

  it('should throw when given object', () => {
    expect(() => pickingGenerator({ array: {} })).toThrow(
      `Can't pick any item - the array is not of type array (object)`,
    );
  });

  it('should throw when given string', () => {
    expect(() => pickingGenerator({ array: 'some-string' })).toThrow(
      `Can't pick any item - the array is not of type array (string)`,
    );
  });

  it('should throw when given nothing', () => {
    expect(() => pickingGenerator({})).toThrow(
      `Can't pick any item - the array is not of type array (undefined)`,
    );
  });
});
