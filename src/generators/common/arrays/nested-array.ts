import { ValueGenerator, ValueGeneratorConfiguration, ValueGeneratorFactory } from '../../base';
import { compileFieldDefinition, FieldDefinition } from '../../../schema';
import { Ecosystem } from '../../../ecosystem';
import { GenerationContext } from '../../context';
import { randomInteger } from '../../../utils';

export const nestedArrayGenerator: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration
): ValueGenerator => {
  const definition = config.definition as FieldDefinition;
  const ecosystem = config.ecosystem as Ecosystem;

  const minItems = (config.minItems ?? 0) as number;
  const maxItems = config.maxItems as number;

  if (!definition) {
    throw new Error(`Can't generate a nested array - 'definition' is a required property`);
  }

  if (!maxItems && maxItems !== 0) {
    throw new Error(`Can't generate a nested array - 'maxItems' is a required property`);
  }

  if (minItems > maxItems) {
    throw new Error(`Can't generate a nested array - 'minItems' must be less or equal to 'maxItems' (${minItems} > ${maxItems})`);
  }

  if (minItems < 0 || maxItems < 0) {
    throw new Error(`Can't generate a nested array - both 'minItems' and 'maxItems' must be positive numbers`);
  }

  const generator = compileFieldDefinition(ecosystem, definition);

  return (context: GenerationContext) => {
    const nItems = randomInteger(context.randomizer, minItems, maxItems);

    const array: unknown[] = [];

    for (let index = 0; index < nItems; index++) {
      array.push(generator(context));
    }

    return array;
  }
}
