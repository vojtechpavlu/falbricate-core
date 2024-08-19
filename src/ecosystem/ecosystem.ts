import { Randomizer, RandomizerFactory } from '../randomizer';

import { CorePlugin, Plugin } from '../plugin';
import { Registry } from './registry';
import { ValueGenerator } from '../generators';

export class Ecosystem {
  private randomizers = new Registry<RandomizerFactory>('randomizer');
  private valueGenerators = new Registry<ValueGenerator>('value-generator');

  /**
   * Constructor taking the optional plugins to be initialized
   *
   * @param {boolean} includeCore Whether should the core plugin be included
   * @param {Plugin[]} plugins To be registered during the initialization phase
   */
  constructor(includeCore: boolean = true, ...plugins: Plugin[]) {
    if (includeCore) {
      this.register(CorePlugin);
    }

    for (const plugin of plugins) {
      this.register(plugin);
    }
  }

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
  };

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
   * Returns whether the Ecosystem has a {@link Randomizer} of the given name
   *
   * @param {string} name Name by which the randomizer should be searched for
   *
   * @returns {boolean} Whether there is or is not a randomizer with
   * the given name registered.
   */
  public hasRandomizerFactory = (name: string): boolean => {
    return this.randomizers.has(name);
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

  /**
   * Returns whether the Ecosystem has a {@link ValueGenerator} of the given name
   *
   * @param {string} name Name by which the Value Generator should be searched for
   *
   * @returns {boolean} Whether there is or is not a Value Generator with
   * the given name registered.
   */
  public hasValueGenerator = (name: string): boolean => {
    return this.valueGenerators.has(name);
  };

  /**
   * Retrieves the {@link ValueGenerator} from the Ecosystem.
   *
   * @param {string} name the {@link ValueGenerator} has
   *
   * @returns {ValueGenerator} Factory for a Value Generator
   *
   * @throws {Error} When no such Value Generator factory is found
   */
  public getValueGenerator = (name: string): ValueGenerator => {
    return this.valueGenerators.get(name);
  };
}
