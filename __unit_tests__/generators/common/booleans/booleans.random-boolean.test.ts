import { randomBoolean } from '../../../../src';

const randomizer = Math.random;

describe('randomBoolean Value Generator', () => {
  it('should generate a boolean', () => {
    const valueGenerator = randomBoolean({ probability: 0.5 });

    expect(typeof valueGenerator({ randomizer })).toBe('boolean');
  });

  it('should generate `true` on probability = 1', () => {
    const valueGenerator = randomBoolean({ probability: 1 });

    expect(valueGenerator({ randomizer })).toBe(true);
  });

  it('should generate `false` on probability = 0', () => {
    const valueGenerator = randomBoolean({ probability: 0 });

    expect(valueGenerator({ randomizer })).toBe(false);
  });

  it('should throw on a not-numeric type', () => {
    expect(() => randomBoolean({ probability: 'not-a-number' })).toThrow(
      `Probability must be a number for random boolean value generator (string)`,
    );
  });

  it('should throw on a probability > 1', () => {
    expect(() => randomBoolean({ probability: 5 })).toThrow(
      `Specified probability for random boolean value generator can't ` +
      `be greater than 1 (5)`
    );
  });

  it('should throw on a probability < 0', () => {
    expect(() => randomBoolean({ probability: -7 })).toThrow(
      `Specified probability for random boolean value generator can't ` +
      `be less than 0 (-7)`
    );
  });

  it('should not throw on a missing probability', () => {
    expect(() => randomBoolean({})).not.toThrow();
  });
});
