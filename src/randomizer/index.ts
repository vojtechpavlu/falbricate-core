import { RandomizerConfiguration, RandomizerFactory } from './base';
import { basicRandomizer } from './basic';
import { seededRandomizer } from './seeded';

/** Names of predefined randomizers */
export type RandomizerName = 'basic' | 'seeded';

const RANDOMIZERS_MAP = {
  basic: basicRandomizer,
  seeded: seededRandomizer,
};

/**
 * Randomizer factor trying to find a {@link RandomizerFactory} by the
 * given {@link RandomizerName} (case-sensitive).
 *
 * @param {RandomizerName} name Name of the desired randomizer factory.
 *
 * @returns {RandomizerFactory} Randomizer factory by the given name.
 *
 * @throws {Error} When no randomizer with the given name is found.
 */
export const getRandomizerByName = <T extends RandomizerConfiguration>(
  name: RandomizerName,
): RandomizerFactory<T> => {
  const factory = RANDOMIZERS_MAP[name];

  if (!factory) {
    throw new Error(
      `No randomizer with name '${name}' found. ` +
        `Try some of '${Object.keys(RANDOMIZERS_MAP)}'`,
    );
  }

  return factory as RandomizerFactory<T>;
};

export * from './base';
export * from './basic';
export * from './seeded';
