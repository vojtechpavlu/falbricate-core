import { FieldDefinition } from './field-definition';
import {
  nullabilityClojure,
  ValueGenerator,
  ValueGeneratorConfiguration,
} from '../generators';
import { Ecosystem } from '../ecosystem';
import { RandomizerFactory } from '../randomizer';

export interface SchemaInput {
  randomizer?: {
    name?: string;
    config?: Record<string, unknown>;
  };
  fields: {
    [name: string]: FieldDefinition;
  };
}

export interface Schema {
  randomizerFactory: RandomizerFactory;
  randomizerConfig: Record<string, unknown>;
  fields: {
    [name: string]: ValueGenerator;
  };
}

const compileRandomizerFactory = (
  ecosystem: Ecosystem,
  name?: string,
): RandomizerFactory => {
  return name
    ? ecosystem.getRandomizerFactory(name)
    : ecosystem.getDefaultRandomizer();
};

const compileFieldDefinition = (
  ecosystem: Ecosystem,
  field: FieldDefinition,
  randomizerFactory: RandomizerFactory,
): ValueGenerator => {
  if (typeof field === 'string') {
    const valueGeneratorFactory = ecosystem.getValueGeneratorFactory(field);
    return valueGeneratorFactory({ ecosystem });
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
        randomizerFactory(),
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

  const fields: { [name: string]: ValueGenerator } = {};

  for (const fieldName of Object.keys(input.fields)) {
    const definition = input.fields[fieldName] as FieldDefinition;

    fields[fieldName] = compileFieldDefinition(
      ecosystem,
      definition,
      randomizerFactory,
    );
  }

  return {
    randomizerConfig,
    randomizerFactory,
    fields,
  };
};
