import {
  Randomizer,
  RandomizerConfiguration,
  RandomizerFactory,
} from '@falbricate/fw';

/**
 * Returns a specific constant value within a range of `[0, 1]`.
 *
 * @param {RandomizerConfiguration} config specifying the `value` field
 *
 * @returns {Randomizer} Constant randomizer returning the preconfigured value
 *
 * @throws {Error} When the `value` is not present within configuration
 * @throws {TypeError} When the `value` is not a number
 * @throws {Error} When the `value` is not within range `[0, 1]`
 */
export const constantRandomizer: RandomizerFactory = (
  config?: RandomizerConfiguration,
): Randomizer => {
  if (!config || !config.value) {
    throw new Error(
      `Constant value must be specified within the given configuration for the constant randomizer`,
    );
  } else if (typeof config.value !== 'number') {
    throw new TypeError(
      `Constant value must be a number for constant randomizer (${typeof config.value})`,
    );
  } else if (config.value < 0 || config.value > 1) {
    throw new Error(
      `Constant value must be within range [0, 1] for constant randomizer (${config.value})`,
    );
  }

  return (() => config.value) as Randomizer;
};
