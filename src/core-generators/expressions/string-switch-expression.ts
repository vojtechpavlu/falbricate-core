import {
  GenerationContext,
  ValueGenerator,
  ValueGeneratorConfiguration,
  ValueGeneratorFactory,
} from '../../generators';
import { compileFieldDefinition, FieldDefinition } from '../../schema';
import { Ecosystem } from '../../ecosystem';

export const stringSwitchExpression: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
): ValueGenerator => {
  const ecosystem = config.ecosystem as Ecosystem;
  const handlersDefinition = config.handlers as {
    [key: string]: FieldDefinition;
  };
  const valueProviderDefinition = config.value as FieldDefinition;
  const defaultValueProviderDefinition = config.default as
    | FieldDefinition
    | undefined;

  if (!handlersDefinition || Object.keys(handlersDefinition).length === 0) {
    throw new Error(`Can't handle null-like values - no handlers specified`);
  }

  if (!valueProviderDefinition) {
    throw new Error(
      `Can't handle null-like values - value property is required`,
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
    defaultValueProvider = compileFieldDefinition(ecosystem, defaultValueProviderDefinition);
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
