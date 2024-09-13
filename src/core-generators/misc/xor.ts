import {
  GenerationContext,
  ValueGenerator,
  ValueGeneratorConfiguration,
  ValueGeneratorFactory,
} from '../../generators';
import { Ecosystem } from '../../ecosystem';
import { compileFieldDefinition, FieldDefinition } from '../../schema';
import { pickRandomItem } from '../../utils';

/**
 * XOR generator enables the possibility to automatically choose between
 * two separate value generators specified within the given configuration.
 *
 * @param {ValueGeneratorConfiguration} config Configuration containing the
 * `options` property (an array of {@link FieldDefinition} items).
 *
 * @returns {ValueGenerator} Value generator being able to automatically
 * and randomly pick between value generators.
 *
 * @throws {Error} When no option was given (non-empty array is expected)
 */
export const xorGenerator: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
): ValueGenerator => {
  const ecosystem = config.ecosystem as Ecosystem;
  const options = config.options as FieldDefinition[];

  if (!options) {
    throw new Error(`Can't generate xor field - no options given`);
  }

  // Compile each Value Generator option
  const generators = options.map((option) =>
    compileFieldDefinition(ecosystem, option),
  );

  return (context: GenerationContext) => {
    // Randomly pick one of the generators
    const selectedGenerator = pickRandomItem(context.randomizer, generators);

    // Generate the value
    return selectedGenerator(context);
  };
};
