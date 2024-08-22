import { FieldDefinition } from './field-definition';
import { ValueGenerator } from '../generators';
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
): ValueGenerator => {
  const valueGeneratorFactory = ecosystem.getValueGeneratorFactory(field.type);

  return valueGeneratorFactory(field.config ?? {});
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
    fields[fieldName] = compileFieldDefinition(ecosystem, definition);
  }

  return {
    randomizerConfig,
    randomizerFactory,
    fields,
  };
};
