import { RandomizerConfiguration, RandomizerFactory } from './base';

/** Simple configuration for seeded randomizer */
export interface SeededRandomizerConfiguration extends RandomizerConfiguration {
  seed: number;
}

/**
 * Generates a seeded (deterministic) pseudo-randomizer. This implementation
 * follows Linear congruential generator algorithm.
 *
 * @param {SeededRandomizerConfiguration} config Configuration specifying
 * the seed to be used by the deterministic randomizer.
 */
export const seededRandomizer: RandomizerFactory<
  SeededRandomizerConfiguration
> = (config?: SeededRandomizerConfiguration) => {
  let { seed } = config ?? { seed: 1 };

  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
};
