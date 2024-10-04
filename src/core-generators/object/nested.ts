import {
  ValueGenerator,
  ValueGeneratorConfiguration,
  ValueGeneratorFactory,
} from '../../generators';
import { SchemaInput } from '../../schema';
import { Ecosystem } from '../../ecosystem';
import { GenerationContext } from '../../generators';
import { reference } from '../../utils';
import { FalsumContainer } from '../../falsum';

/**
 * Value generator for creating a nested object from the configured schema.
 * During the creation of the output {@link ValueGenerator}, the schema is
 * being compiled.
 *
 * @param {ValueGeneratorConfiguration} config Configuration containing
 * field `schema` (of type {@link SchemaInput}) and field `ecosystem`
 * ({@link Ecosystem}). You can also specify a `path` property which specifies
 * the path within {@link FalsumContainer} (by default `original` is used).
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
  const path = (config.path as string) ?? 'original';

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
    const falsumContainer: FalsumContainer =
      nestedFalbricator.generate(context);
    return reference(
      falsumContainer as unknown as Record<string, unknown>,
      path,
    );
  };
};
