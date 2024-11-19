import {
  ValueGenerator,
  ValueGeneratorConfiguration,
  ValueGeneratorFactory,
  GenerationContext,
  pickRandomItem,
} from '@falbricate/fw';

export const pickingGenerator: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
): ValueGenerator => {
  const options = config.options as unknown[];

  if (!Array.isArray(options)) {
    throw new TypeError(
      `Can't pick any item - the options is not of type array (${typeof options})`,
    );
  }
  if (options.length === 0) {
    throw new Error(
      `Can't pick any item - the given options is an empty array`,
    );
  }

  return (context: GenerationContext) => {
    return pickRandomItem(context.randomizer, options);
  };
};
