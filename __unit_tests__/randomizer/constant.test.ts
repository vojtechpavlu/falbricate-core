import { constantRandomizer } from '../../src';
import { RandomizerConfiguration } from '@falbricate/fw';

describe('Constant randomizer', () => {
  it('should return a given number', () => {
    const config: RandomizerConfiguration = { value: 0.123 };
    const randomizer = constantRandomizer(config);

    expect(randomizer()).toBe(0.123);
  });

  it('should throw on not present value', () => {
    const config: RandomizerConfiguration = {};

    expect(() => constantRandomizer(config)).toThrow(
      `Constant value must be specified within the given ` +
        `configuration for the constant randomizer`,
    );
  });

  it('should throw on value not being a number', () => {
    const config: RandomizerConfiguration = { value: 'not-a-number' };

    expect(() => constantRandomizer(config)).toThrow(
      `Constant value must be a number for constant randomizer (string)`,
    );
  });

  it('should throw on value not being within a range', () => {
    const config: RandomizerConfiguration = { value: 5 };

    expect(() => constantRandomizer(config)).toThrow(
      `Constant value must be within range [0, 1] for constant randomizer (5)`,
    );
  });
});
