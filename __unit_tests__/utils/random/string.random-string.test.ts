import { randomString } from '../../../src';

const randomizer = Math.random;
const charset = ['a', 'b'];

describe('randomString function', () => {
  it('should return a string', () => {
    const generated = randomString(randomizer, 3, charset);
    expect(typeof generated).toBe('string');
  });

  it('should return a string of expected length', () => {
    const generated = randomString(randomizer, 3, charset);
    expect(generated.length).toBe(3);
  });

  it('should consist only of expected characters', () => {
    const generated = randomString(randomizer, 1000, charset);
    for (const char of generated) {
      expect(charset).toContain(char);
    }
  });

  it('should contain all characters', () => {
    const generated = randomString(randomizer, 1000, charset);
    for (const char of charset) {
      expect(generated).toContain(char);
    }
  });

  it('should return empty string on length=0', () => {
    expect(randomString(randomizer, 0, charset)).toBe('');
  });

  it('should throw on negative length', () => {
    expect(() => randomString(randomizer, -7, charset)).toThrow(
      `The length of a string can't be negative (-7)`,
    );
  });

  it('should throw on empty charset', () => {
    expect(() => randomString(randomizer, 3, [])).toThrow(
      `The charset must consist of at least one item`,
    );
  });

  it('should throw on non-charset', () => {
    expect(() => randomString(randomizer, 3, ['not', 'a', 'charset'])).toThrow(
      `Given value is not a charset (must be array of single-character strings)`,
    );
  });
});
