import { ValueGenerator, ValueGeneratorConfiguration, ValueGeneratorFactory } from '../../base';
import { SchemaInput } from '../../../schema';
import { Ecosystem } from '../../../ecosystem';
import { GenerationContext } from '../../context';

export const nestedObject: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration
): ValueGenerator => {
  const schema = config.schema as SchemaInput;
  const ecosystem = config.ecosystem as Ecosystem;

  if (!schema) {
    throw new Error(`Can't create a nested object - given schema is not defined`);
  }

  const nestedFalbricator = ecosystem.compile(schema);

  return (context: GenerationContext) => {
    return nestedFalbricator.generate(context)
  }
}
