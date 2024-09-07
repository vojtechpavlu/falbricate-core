import { FieldDefinition } from './field-definition';
import {
  nullabilityClojure,
  ValueGenerator,
  ValueGeneratorConfiguration,
} from '../generators';
import { Ecosystem } from '../ecosystem';
import { RandomizerFactory } from '../randomizer';
import { factory } from 'ts-jest/dist/transformers/hoist-jest';

/** Prefix used to determine the field is referencing a context */
const REFERENCE_PREFIX = '!ref-';

/** Prefix used to determine the value is a constant */
const CONSTANT_PREFIX = '!const-';

/** Prefix used to determine the value is a preconfigured definition */
const PRECONFIGURATION_PREFIX = '!conf-';

/** Schema defined by the client - plain JSON-like object is expected */
export interface SchemaInput {
  /**
   * Optional randomizer configuration. When not provided, the default one
   * will be used.
   */
  randomizer?: {
    /** Name of the randomizer to be used */
    name?: string;

    /** Further configuration */
    config?: Record<string, unknown>;
  };

  /**
   * Profiles to be universally used during the Falsum fabrication.
   * Fields defined in here won't be part of the result Falsum; although
   * they are expected to be used as a single source of truth for
   * {@link ValueGenerator}s of {@link SchemaInput#fields}.
   */
  profiles?: {
    [name: string]: FieldDefinition;
  };

  /** Fields the generated Falsum should consist of */
  fields: {
    [name: string]: FieldDefinition;
  };
}

/**
 * Result of {@link SchemaInput} compilation - preprocessed and preconfigured
 * object definition being able to handle Falsum fabrication.
 */
export interface Schema {
  randomizerFactory: RandomizerFactory;
  randomizerConfig: Record<string, unknown>;
  profiles: {
    [name: string]: ValueGenerator;
  };
  fields: {
    [name: string]: ValueGenerator;
  };
}

/**
 * Function to provide randomizer factory to be used by the given name.
 *
 * @param {Ecosystem} ecosystem Ecosystem to be used for the randomizer search
 * @param {string} name Optional name of the randomizer; when not given, the
 * default one will be used.
 *
 * @returns {RandomizerFactory} Factory for providing a randomizer instances.
 */
const compileRandomizerFactory = (
  ecosystem: Ecosystem,
  name?: string,
): RandomizerFactory => {
  return name
    ? ecosystem.getRandomizerFactory(name)
    : ecosystem.getDefaultRandomizer();
};

/**
 * Function compiling standards ({@link ValueGenerator} being set up as-is; not
 * needing any further configuration since all the settings are implied).
 *
 * @param {Ecosystem} ecosystem Ecosystem the generator will be searched in
 * @param {string} field Field definition as a string value defining the standard
 *
 * @returns {ValueGenerator} Fully preconfigured Value Generator
 */
const compileStandard = (
  ecosystem: Ecosystem,
  field: string,
): ValueGenerator => {
  if (field.startsWith(REFERENCE_PREFIX)) {
    // Standard referencing to context
    const path = field.slice(REFERENCE_PREFIX.length);
    const factory = ecosystem.getValueGeneratorFactory('reference');
    return factory({ ecosystem, path });
  } else if (field.startsWith(CONSTANT_PREFIX)) {
    // Standard providing a constant value
    let value: unknown = field.slice(CONSTANT_PREFIX.length);

    try {
      // Try to parse the value; might not be possible
      value = JSON.parse(value as string);
    } catch {
      /* intentionally empty */
    }

    const factory = ecosystem.getValueGeneratorFactory('constant');
    return factory({ ecosystem, value });
  }

  // Standard returning a standard type of value
  const valueGeneratorFactory = ecosystem.getValueGeneratorFactory(field);
  return valueGeneratorFactory({ ecosystem });
};

/**
 * Function to compile {@link FieldDefinition}s into {@link ValueGenerator}s
 *
 * @param {Ecosystem} ecosystem Ecosystem holding the functionalities
 * @param {{ [name: string]: FieldDefinition }} fields Field definitions to be compiled
 *
 * @returns {{ [name: string]: ValueGenerator }} Object consisting of
 * compiled {@link ValueGenerator}s
 */
const compileFieldsObject = (
  ecosystem: Ecosystem,
  fields?: { [name: string]: FieldDefinition },
): { [name: string]: ValueGenerator } => {
  if (!fields) {
    return {} as { [name: string]: ValueGenerator };
  }

  const result: { [name: string]: ValueGenerator } = {};

  for (const fieldName of Object.keys(fields)) {
    const definition = fields[fieldName] as FieldDefinition;

    result[fieldName] = compileFieldDefinition(ecosystem, definition);
  }

  return result;
};

/**
 * Function trying to compile a {@link FieldDefinition}.
 *
 * @param {Ecosystem} ecosystem Ecosystem providing a functionality context
 * @param {FieldDefinition} field Field being compiled (turned into a {@link ValueGenerator}
 *
 * @returns {ValueGenerator} Value generator providing a value for a future field
 * within a generated Falsum
 */
export const compileFieldDefinition = (
  ecosystem: Ecosystem,
  field: FieldDefinition,
): ValueGenerator => {
  if (typeof field === 'string') {

    // When preconfigured
    if (field.startsWith(PRECONFIGURATION_PREFIX)) {
      const configName = field.slice(PRECONFIGURATION_PREFIX.length);
      const objectDefinition = ecosystem.getPreconfiguration(configName);
      return compileFieldDefinition(ecosystem, objectDefinition);
    }

    return compileStandard(ecosystem, field);
  } else if (typeof field === 'object') {
    const valueGeneratorFactory = ecosystem.getValueGeneratorFactory(
      field.type,
    );

    const config: ValueGeneratorConfiguration = {
      ...field.config,
      ecosystem,
    };

    if (config.nullability) {
      const { value, probability } = config.nullability;

      if (!probability && probability !== 0) {
        throw new Error(
          `Nullability is specified but is missing 'probability'`,
        );
      }

      return nullabilityClojure(
        valueGeneratorFactory(config),
        probability,
        value,
      );
    }

    return valueGeneratorFactory(config);
  } else {
    throw new TypeError(
      `Unexpected field definition format - ${JSON.stringify(field)}`,
    );
  }
};

/**
 * Function compiling the whole given {@link SchemaInput} into {@link Schema}.
 *
 * @param {SchemaInput} input Given declarative Schema Input to be compiled - the
 * whole configuration and definition of future Falsum objects.
 *
 * @param {Ecosystem} ecosystem Ecosystem to be used to provide the {@link ValueGenerator}s,
 * {@link RandomizerFactory} and other such resources
 *
 * @returns {Schema} Compiled Schema instance being able to provide Falsum objects.
 */
export const compileSchemaInput = (
  input: SchemaInput,
  ecosystem: Ecosystem,
): Schema => {
  const randomizerConfig: Record<string, unknown> =
    input.randomizer?.config ?? {};

  const randomizerFactory = compileRandomizerFactory(
    ecosystem,
    input.randomizer?.name,
  );

  // Compile profile fields
  const profiles = compileFieldsObject(ecosystem, input.profiles);

  // Compile Falsum fields
  const fields = compileFieldsObject(ecosystem, input.fields);

  return {
    randomizerConfig,
    randomizerFactory,
    profiles,
    fields,
  };
};
