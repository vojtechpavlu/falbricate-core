import {
  ValueGenerator,
  ValueGeneratorConfiguration,
  ValueGeneratorFactory,
} from '../../base';
import { SchemaInput } from '../../../schema';
import { Ecosystem } from '../../../ecosystem';
import { GenerationContext } from '../../context';

/**
 * Value generator for creating a nested object from the configured schema.
 * During the creation of the output {@link ValueGenerator}, the schema is
 * being compiled.
 *
 * @param {ValueGeneratorConfiguration} config Configuration containing
 * field `schema` (of type {@link SchemaInput}) and field `ecosystem`
 * ({@link Ecosystem})
 *
 * @returns {ValueGenerator} Value Generator being able to generate
 *
 * @throws {Error} When the schema (`config.schema`) is missing
 * @throws {Error} When the ecosystem (`config.ecosystem`) is missing
 */
export const nestedObject: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
): ValueGenerator => {
  const schema = config.schema as SchemaInput;
  const ecosystem = config.ecosystem as Ecosystem;

  if (!schema) {
    throw new Error(
      `Can't create a nested object - given schema is not defined`,
    );
  }

  if (!ecosystem) {
    throw new Error(
      `Can't create a nested object - given ecosystem is not defined`,
    );
  }

  const nestedFalbricator = ecosystem.compile(schema);

  return (context: GenerationContext) => {
    return nestedFalbricator.generate(context);
  };
};
