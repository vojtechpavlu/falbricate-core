import { Randomizer, RandomizerConfiguration, RandomizerFactory } from './base';

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
 *
 * @returns {Randomizer} Deterministic randomizer following the internal seed
 */
export const seededRandomizer: RandomizerFactory<
  SeededRandomizerConfiguration
> = (config?: SeededRandomizerConfiguration): Randomizer => {
  let { seed } = config ?? { seed: 1 };

  return () => {
    seed = (seed * 9301 + 49_297) % 233_280;
    return seed / 233_280;
  };
};
