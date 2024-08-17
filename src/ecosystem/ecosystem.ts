import {
  Randomizer,
  RandomizerFactory,
  basicRandomizer,
  seededRandomizer,
} from '../randomizer';

import { Plugin } from '../plugin';
import { Registry } from './registry';

export class Ecosystem {
  private randomizers = new Registry<RandomizerFactory>('randomizer', {
    basic: basicRandomizer,
    seeded: seededRandomizer,
  });

  /**
   * Registers all the records from the given map of randomizer factories.
   *
   * @param {Record<string, RandomizerFactory>} records Map of randomizer factories.
   */
  private registerRandomizers = (
    records: Record<string, RandomizerFactory>,
  ): void => {
    for (const key of Object.keys(records)) {
      const randomizerFactory = records[key];

      if (randomizerFactory) {
        this.randomizers.register(key, randomizerFactory);
      }
    }
  };

  /**
   * Registers the given plugin into this ecosystem.
   *
   * @param {Plugin} plugin Plugin enriching the functionality to be registered.
   */
  public register = (plugin: Plugin): void => {
    this.registerRandomizers(plugin.randomizers ?? {});
  };

  /**
   * Retrieves the {@link RandomizerFactory} from the Ecosystem.
   *
   * @param {string} name the {@link Randomizer} has
   *
   * @returns {RandomizerFactory} Factory for a randomizer
   *
   * @throws {Error} When no such randomizer factory is found
   */
  public getRandomizerFactory = (name: string): RandomizerFactory => {
    return this.randomizers.get(name);
  };
}
