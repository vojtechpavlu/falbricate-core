import { RandomizerFactory } from '../randomizer';
import { Plugin } from '../plugin';
import { Registry } from './registry';
import { ValueGeneratorFactory } from '../generators';
import { Falbricator, generateFalsum, generateProfiles } from '../falbricator';
import { compileSchemaInput, ObjectDefinition, SchemaInput } from '../schema';
import { Falsum } from '../falsum';
import { Charset } from '../utils';
import { PipeFactory } from '../pipes';

type EcosystemRegistryType =
  | 'randomizers'
  | 'charsets'
  | 'valueGenerators'
  | 'preconfigurations'
  | 'pipes';

export class Ecosystem {
  private randomizers = new Registry<RandomizerFactory>('randomizers');
  private charsets = new Registry<Charset>('charsets');
  private valueGenerators = new Registry<ValueGeneratorFactory>(
    'valueGenerators',
  );
  private preconfigurations = new Registry<ObjectDefinition>(
    'preconfigurations',
  );
  private pipes = new Registry<PipeFactory>('pipes');

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
   * Returns a registry by its specified name.
   *
   * @param {string} name Name of the registry type.
   *
   * @returns {Registry<unknown>} Registry of the specified type.
   */
  private getRegistry = (name: EcosystemRegistryType) => {
    switch (name) {
      case 'randomizers': {
        return this.randomizers;
      }
      case 'charsets': {
        return this.charsets;
      }
      case 'valueGenerators': {
        return this.valueGenerators;
      }
      case 'preconfigurations': {
        return this.preconfigurations;
      }
      case 'pipes': {
        return this.pipes;
      }
      default: {
        throw new Error(`Unrecognized registry type: '${name}'`);
      }
    }
  };

  private registerItems = (
    type: EcosystemRegistryType,
    items?: Record<string, unknown>,
  ) => {
    // @ts-expect-error Make the declaration rather simpler without TS than making it correct but unreadable
    this.getRegistry(type).registerAll(items ?? {});
  };

  public has = (type: EcosystemRegistryType, name: string): boolean => {
    return this.getRegistry(type).has(name);
  };

  public get(type: 'randomizers', name: string): RandomizerFactory;
  public get(type: 'charsets', name: string): Charset;
  public get(type: 'valueGenerators', name: string): ValueGeneratorFactory;
  public get(type: 'preconfigurations', name: string): ObjectDefinition;
  public get(type: 'pipes', name: string): PipeFactory;
  public get(
    type: EcosystemRegistryType,
    name: string,
  ):
    | RandomizerFactory
    | Charset
    | ValueGeneratorFactory
    | ObjectDefinition
    | PipeFactory {
    return this.getRegistry(type).get(name);
  }

  public remove(type: EcosystemRegistryType, name: string): void {
    this.getRegistry(type).remove(name);
  }

  /**
   * Registers the given plugin into this ecosystem.
   *
   * @param {Plugin} plugin Plugin enriching the functionality to be registered.
   */
  public register = (plugin: Plugin): void => {
    this.registerItems('randomizers', plugin.randomizers);
    this.registerItems('valueGenerators', plugin.valueGenerators);
    this.registerItems('charsets', plugin.charsets);
    this.registerItems('preconfigurations', plugin.preconfigurations);
    this.registerItems('pipes', plugin.pipes);
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
