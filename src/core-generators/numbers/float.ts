import {
  ValueGenerator,
  ValueGeneratorConfiguration,
  ValueGeneratorFactory,
} from '../../generators';
import { GenerationContext } from '../../generators';
import { randomFloat } from '../../utils';

export const floatGenerator: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
): ValueGenerator => {
  const decimalDigits = (config.decimalDigits ?? 2) as number;
  const min = (config.min ?? 0) as number;
  const max = config.max as number;

  if (!max && max !== 0) {
    throw new Error(`Property 'max' is required for float value generator`);
  } else if (max < min) {
    throw new Error(
      `Maximum must be greater or equal to minimum for float value generator to work`,
    );
  }

  return (context: GenerationContext) => {
    return randomFloat(context.randomizer, min, max, decimalDigits);
  };
};
