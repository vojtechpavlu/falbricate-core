import { randomStringOfRandomLength } from '../../../src';

const randomizer = Math.random;
const charset = ['a', 'b'];

describe('randomStringOfRandomLength function', () => {
  it('should generate a string of length within the interval', () => {
    const generated = randomStringOfRandomLength(randomizer, charset, 10, 1);

    expect(generated.length).toBeGreaterThanOrEqual(1);
    expect(generated.length).toBeLessThanOrEqual(10);
  });

  it('should throw on maxLength < minLength', () => {
    expect(() =>
      randomStringOfRandomLength(randomizer, charset, 1, 10),
    ).toThrow(
      `Can't generate a random string of random length when maxLength < minLength`,
    );
  });
});
