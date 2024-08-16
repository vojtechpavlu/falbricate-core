import { Randomizer, RandomizerConfiguration, RandomizerFactory } from './base';

/**
 * Simple randomizer for quick and simple pseudo-randoms
 *
 * @returns {number} Pseudo-random number within a range of `[0, 1]`
 */
const randomizer: Randomizer = Math.random;

/**
 * Generates a basic randomizer providing pseudo-random numbers.
 *
 * @returns {Randomizer} Basic randomizer for generating quick
 * pseudo-random numbers within a range of `[0, 1]`
 */
export const basicRandomizer: RandomizerFactory<
  RandomizerConfiguration
> = (): Randomizer => {
  return randomizer;
};
