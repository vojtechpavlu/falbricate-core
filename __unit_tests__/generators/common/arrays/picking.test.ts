import { pickingGenerator } from '../../../../src';

const randomizer = Math.random;
const options = ['a', 'b', 'c'];

describe('picking generator', () => {
  it('should return an item of expected type', () => {
    const generator = pickingGenerator({ options });

    expect(typeof generator({ randomizer })).toBe('string');
  });

  it('should return an item from the array', () => {
    const generator = pickingGenerator({ options });

    expect(options).toContain(generator({ randomizer }));
  });

  it('should throw when given empty array', () => {
    expect(() => pickingGenerator({ options: [] })).toThrow(
      `Can't pick any item - the given options is an empty array`,
    );
  });

  it('should throw when given object', () => {
    expect(() => pickingGenerator({ options: {} })).toThrow(
      `Can't pick any item - the options is not of type array (object)`,
    );
  });

  it('should throw when given string', () => {
    expect(() => pickingGenerator({ options: 'some-string' })).toThrow(
      `Can't pick any item - the options is not of type array (string)`,
    );
  });

  it('should throw when given nothing', () => {
    expect(() => pickingGenerator({})).toThrow(
      `Can't pick any item - the options is not of type array (undefined)`,
    );
  });
});
