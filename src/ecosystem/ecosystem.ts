import { Randomizer, RandomizerFactory } from '../randomizer';
import { Plugin } from '../plugin';
import { Registry } from './registry';
import { ValueGeneratorFactory } from '../generators';
import { Falbricator, generateFalsum, generateProfiles } from '../falbricator';
import { compileSchemaInput, ObjectDefinition, SchemaInput } from '../schema';
import { Falsum } from '../falsum';
import { Charset } from '../utils';

export class Ecosystem {
  private randomizers = new Registry<RandomizerFactory>('randomizer');
  private charsets = new Registry<Charset>('charset');
  private valueGenerators = new Registry<ValueGeneratorFactory>(
    'value-generator',
  );
  private preconfigurations = new Registry<ObjectDefinition>(
    'preconfigurations',
  );

  /**
   * Constructor taking the optional plugins to be initialized
   *
   * @param {Plugin[]} plugins To be registered during the initialization phase
   */
  constructor(...plugins: Plugin[]) {
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
   * @param {Record<string, ValueGeneratorFactory>} records Map of Value Generator factories.
   */
  private registerValueGeneratorFactories = (
    records: Record<string, ValueGeneratorFactory>,
  ): void => {
    this.valueGenerators.registerAll(records);
  };

  /**
   * Registers all the records from the given map of {@link Charset}s.
   *
   * @param {Record<string, Charset>} records Map of charsets.
   */
  private registerCharsets = (records: Record<string, Charset>): void => {
    this.charsets.registerAll(records);
  };

  /**
   * Registers all the given preconfigurations ({@link ObjectDefinition}s).
   *
   * @param {Record<string, ObjectDefinition>} records Map of preconfigurated fields.
   */
  private registerPreconfigurations = (
    records: Record<string, ObjectDefinition>,
  ): void => {
    this.preconfigurations.registerAll(records);
  };

  /**
   * Registers the given plugin into this ecosystem.
   *
   * @param {Plugin} plugin Plugin enriching the functionality to be registered.
   */
  public register = (plugin: Plugin): void => {
    this.registerRandomizers(plugin.randomizers ?? {});
    this.registerValueGeneratorFactories(plugin.valueGenerators ?? {});
    this.registerCharsets(plugin.charsets ?? {});
    this.registerPreconfigurations(plugin.preconfigurations ?? {});
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
   * Returns a default randomizer registered in this ecosystem.
   *
   * @returns {RandomizerFactory} for default randomizer
   *
   * @throws {Error} When there is no randomizer registered
   */
  public getDefaultRandomizer = (): RandomizerFactory => {
    return this.randomizers.getFirst();
  };

  /**
   * Removes a {@link Randomizer} with the given name. When no such found,
   * it simply skips it.
   *
   * @param {string} name Name under which the randomizer is being stored
   */
  public removeRandomizer = (name: string): void => {
    this.randomizers.remove(name);
  };

  /**
   * Returns whether the Ecosystem has a {@link ValueGeneratorFactory} of the given name
   *
   * @param {string} name Name by which the Value Generator factory should be searched for
   *
   * @returns {boolean} Whether there is or is not a Value Generator factory with
   * the given name registered.
   */
  public hasValueGeneratorFactory = (name: string): boolean => {
    return this.valueGenerators.has(name);
  };

  /**
   * Retrieves the {@link ValueGeneratorFactory} from the Ecosystem.
   *
   * @param {string} name the {@link ValueGeneratorFactory} has
   *
   * @returns {ValueGeneratorFactory} Factory for a Value Generator
   *
   * @throws {Error} When no such Value Generator factory is found
   */
  public getValueGeneratorFactory = (name: string): ValueGeneratorFactory => {
    return this.valueGenerators.get(name);
  };

  /**
   * Removes a {@link ValueGeneratorFactory} with the given name. When no such found,
   * it simply skips it.
   *
   * @param {string} name Name under which the Value Generator factory is being stored
   */
  public removeValueGeneratorFactory = (name: string): void => {
    this.valueGenerators.remove(name);
  };

  /**
   * Returns whether the Ecosystem has a {@link Charset} of the given name
   *
   * @param {string} name Name by which the Charset should be searched for
   *
   * @returns {boolean} Whether there is or is not a Charset with
   * the given name registered.
   */
  public hasCharset = (name: string): boolean => {
    return this.charsets.has(name);
  };

  /**
   * Retrieves the {@link Charset} from the Ecosystem.
   *
   * @param {string} name the {@link Charset} has
   *
   * @returns {Charset} Registered Charset with such name
   *
   * @throws {Error} When no such Charset is found
   */
  public getCharset = (name: string): Charset => {
    return this.charsets.get(name);
  };

  /**
   * Removes a {@link Charset} with the given name. When no such found,
   * it simply skips it.
   *
   * @param {string} name Name under which the Charset is being stored
   */
  public removeCharset = (name: string): void => {
    this.charsets.remove(name);
  };

  /**
   * Returns whether the Ecosystem has a {@link ObjectDefinition} of the given name
   *
   * @param {string} name Name by which the ObjectDefinition should be searched for
   *
   * @returns {boolean} Whether there is or is not a ObjectDefinition with
   * the given name registered.
   */
  public hasPreconfiguration = (name: string): boolean => {
    return this.preconfigurations.has(name);
  };

  /**
   * Retrieves the {@link ObjectDefinition} from the Ecosystem.
   *
   * @param {string} name the {@link ObjectDefinition} has
   *
   * @returns {ObjectDefinition} Registered field preconfiguration with such name
   *
   * @throws {Error} When no such ObjectDefinition is found
   */
  public getPreconfiguration = (name: string): ObjectDefinition => {
    return this.preconfigurations.get(name);
  };

  /**
   * Removes a {@link ObjectDefinition} with the given name. When no such found,
   * it simply skips it.
   *
   * @param {string} name Name under which the field preconfiguration is being stored
   */
  public removePreconfiguration = (name: string): void => {
    this.preconfigurations.remove(name);
  };

  /**
   * Compiles the given schema into a Falbricator instance being able to generate items.
   *
   * @param {SchemaInput} schemaInput Input declaring how should the desired
   * {@link Falsum} object look like.
   *
   * @returns {Falbricator} Falbricator used to generate Falsa.
   */
  public compile = (schemaInput: SchemaInput): Falbricator => {
    const schema = compileSchemaInput(schemaInput, this);

    return {
      generate: (context?: Record<string, unknown>) => {
        const randomizer = schema.randomizerFactory(schema.randomizerConfig);

        context = context ?? {};

        const profiles = generateProfiles(schema, randomizer, context, 0);
        return generateFalsum(schema, randomizer, context, profiles, 0);
      },
      generateMany: (n: number, context?: Record<string, unknown>) => {
        const randomizer = schema.randomizerFactory(schema.randomizerConfig);
        const items = [];

        context = context ?? {};

        for (let index = 0; index < n; index++) {
          const profiles = generateProfiles(schema, randomizer, context, 0);
          items.push(
            generateFalsum(schema, randomizer, context, profiles, index),
          );
        }

        return items;
      },
    };
  };
}
