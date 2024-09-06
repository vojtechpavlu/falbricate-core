import { samplingGenerator } from '../../../../src';

const randomizer = Math.random;
const array = ['a', 'b', 'c', 'd', 'e', 'f'];

describe('sampling generator', () => {
  it('should generate an array', () => {
    const generator = samplingGenerator({ array });
    expect(Array.isArray(generator({ randomizer }))).toBe(true);
  });

  it('should generate a possibly non-empty array', () => {
    const generator = samplingGenerator({ array });
    expect(
      (generator({ randomizer }) as string[]).length,
    ).toBeGreaterThanOrEqual(0);
  });

  it('should generate an array with lenght within range', () => {
    const generator = samplingGenerator({
      array,
      minLength: 2,
      maxLength: 3,
    });

    const generated = generator({ randomizer }) as string[];

    expect(generated.length).toBeGreaterThanOrEqual(2);
    expect(generated.length).toBeLessThanOrEqual(3);
  });

  it('should throw on empty array', () => {
    expect(() => samplingGenerator({ array: [] })).toThrow(
      `Can't make a sample - the given array is empty`,
    );
  });

  it('should throw on non-array type', () => {
    expect(() => samplingGenerator({ array: {} })).toThrow(
      `Can't make a sample - the array is not of type array (object)`,
    );
  });

  it('should throw on min > max', () => {
    expect(() =>
      samplingGenerator({
        array,
        minLength: 3,
        maxLength: 2,
      }),
    ).toThrow(
      `Can't make a sample - maximum sample length is less than the minimum`,
    );
  });
});
