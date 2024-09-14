import {
  GenerationContext,
  ValueGenerator,
  ValueGeneratorConfiguration,
  ValueGeneratorFactory,
} from '../../generators';
import { compileFieldDefinition, FieldDefinition } from '../../schema';
import { Ecosystem } from '../../ecosystem';

/**
 * This switch expression is comparing a value provided by a defined
 * {@link ValueGenerator} using a switch-like structure; when it finds a
 * matching pattern (stringified value matches one between the handlers),
 * it generates the corresponding value.
 *
 * @param {ValueGeneratorConfiguration} config Configuration consisting of:
 * - `value` - {@link FieldDefinition} representing the Value generator that
 * should generate the tested value
 * - `handlers` - Declaration of values with attached Value generators (field
 * definitions) that should be triggered - of type `Record<string, FieldDefinition>`
 * - `default` (optional) - Field definition defining what value should be used
 * when no handler matches the value. When not provided, it will return
 * `undefined` in this case.
 *
 * @returns {ValueGenerator} Value generator being able to decide which value
 * should be used by the given expression handlers.
 */
export const stringSwitchExpression: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
): ValueGenerator => {
  const ecosystem = config.ecosystem as Ecosystem;
  const handlersDefinition = config.handlers as Record<string, FieldDefinition>;
  const valueProviderDefinition = config.value as FieldDefinition;
  const defaultValueProviderDefinition = config.default as
    | FieldDefinition
    | undefined;

  if (!ecosystem) {
    throw new Error(
      `Can't handle the string switch expression - 'ecosystem' property is required`,
    );
  }

  if (!handlersDefinition || Object.keys(handlersDefinition).length === 0) {
    throw new Error(
      `Can't handle the string switch expression - no handlers specified`,
    );
  }

  if (!valueProviderDefinition) {
    throw new Error(
      `Can't handle the string switch expression - 'value' property is required`,
    );
  }

  const handlers: { [key: string]: ValueGenerator } = {};

  for (const key of Object.keys(handlersDefinition)) {
    const fieldDefinition = handlersDefinition[key] as FieldDefinition;
    handlers[key] = compileFieldDefinition(ecosystem, fieldDefinition);
  }

  const valueProvider = compileFieldDefinition(
    ecosystem,
    valueProviderDefinition,
  );

  let defaultValueProvider: ValueGenerator;

  if (defaultValueProviderDefinition) {
    defaultValueProvider = compileFieldDefinition(
      ecosystem,
      defaultValueProviderDefinition,
    );
  }

  return (context: GenerationContext) => {
    const value = valueProvider(context) + '';
    const generator = handlers[value];

    if (!generator) {
      return defaultValueProvider ? defaultValueProvider(context) : undefined;
    }

    return generator(context);
  };
};
