import {
  ValueGenerator,
  ValueGeneratorConfiguration,
  ValueGeneratorFactory,
  GenerationContext,
  Ecosystem,
  compileFieldDefinition,
  FieldDefinition,
} from '@falbricate/fw';
import { stringTemplate } from '../../utils';

type VariablesDefinitions = { [key: string]: FieldDefinition };

export const stringTemplateGenerator: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
): ValueGenerator => {
  const ecosystem = config.ecosystem as Ecosystem;
  const template = config.template as string;
  const variablesDefinitions = config.variables as VariablesDefinitions;

  if (!template) {
    throw new Error(
      `Can't generate a string from a template - got empty 'template' property`,
    );
  }

  const variablesGenerators: { [key: string]: ValueGenerator } = {};

  for (const key of Object.keys(variablesDefinitions)) {
    const fieldDefinition = variablesDefinitions[key] as FieldDefinition;
    variablesGenerators[key] = compileFieldDefinition(
      ecosystem,
      fieldDefinition,
    );
  }

  return (context: GenerationContext) => {
    const variables: { [key: string]: () => unknown } = {};
    for (const key of Object.keys(variablesGenerators)) {
      const generator = variablesGenerators[key] as ValueGenerator;
      variables[key] = () => generator(context);
    }

    return stringTemplate(template, context.randomizer, variables);
  };
};
