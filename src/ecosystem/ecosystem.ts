import {
  Randomizer,
  RandomizerFactory
} from '../randomizer';

import { Plugin } from '../plugin';
import { Registry } from './registry';
import { ValueGenerator } from '../generators';

export class Ecosystem {
  private randomizers = new Registry<RandomizerFactory>('randomizer');

  private valueGenerators = new Registry<ValueGenerator>('value-generator');

  /**
   * Registers all the records from the given map of randomizer factories.
   *
   * @param {Record<string, RandomizerFactory>} records Map of randomizer factories.
   */
  private registerRandomizers = (
    records: Record<string, RandomizerFactory>,
  ): void => {
    this.randomizers.registerAll(records);
  };

  /**
   * Registers all the records from the given map of Value Generator factories.
   *
   * @param {Record<string, ValueGenerator>} records Map of Value Generator factories.
   */
  private registerValueGenerators = (
    records: Record<string, ValueGenerator>,
  ): void => {
    this.valueGenerators.registerAll(records);
  }

  /**
   * Registers the given plugin into this ecosystem.
   *
   * @param {Plugin} plugin Plugin enriching the functionality to be registered.
   */
  public register = (plugin: Plugin): void => {
    this.registerRandomizers(plugin.randomizers ?? {});
    this.registerValueGenerators(plugin.valueGenerators ?? {});
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
