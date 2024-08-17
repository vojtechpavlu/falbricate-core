import { Randomizer, RandomizerConfiguration, RandomizerFactory } from './base';

/**
 * Generates a seeded (deterministic) pseudo-randomizer. This implementation
 * follows Linear congruential generator algorithm.
 *
 * @param {RandomizerConfiguration} config Configuration specifying
 * the seed to be used by the deterministic randomizer.
 *
 * @returns {Randomizer} Deterministic randomizer following the internal seed
 */
export const seededRandomizer: RandomizerFactory = (
  config?: RandomizerConfiguration,
): Randomizer => {
  if (!config || !config.seed) {
    throw new Error(
      'Seed must be specified within the given configuration for seeded randomizer',
    );
  } else if (typeof config.seed === 'number') {
    let seed: number = config.seed;
    return () => {
      seed = (seed * 9301 + 49_297) % 233_280;
      return seed / 233_280;
    };
  } else {
    throw new TypeError(`Seed must be a number (${typeof config.seed})`);
  }
};
