import { GenerationContext } from '../../context';
import {
  ValueGenerator,
  ValueGeneratorConfiguration,
  ValueGeneratorFactory,
} from '../../base';
import { randomInteger } from '../../../utils';

export const integerGenerator: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
): ValueGenerator => {
  const min = (config.min ?? 0) as number;
  const max = config.max as number;

  if (!max && max !== 0) {
    throw new Error(`Property 'max' is required for integer value generator`);
  } else if (max < min) {
    throw new Error(
      `Maximum must be greater or equal to minimum for integer value generator to work`,
    );
  }

  return (context: GenerationContext) => {
    return randomInteger(context.randomizer, min, max);
  };
};
