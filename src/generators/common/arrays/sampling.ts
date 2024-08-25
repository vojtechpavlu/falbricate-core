import {
  ValueGenerator,
  ValueGeneratorConfiguration,
  ValueGeneratorFactory,
} from '../../base';
import { GenerationContext } from '../../context';
import { selectSample } from '../../../utils';

export const samplingGenerator: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
): ValueGenerator => {
  const array = config.array as unknown[];

  if (!Array.isArray(array)) {
    throw new TypeError(
      `Can't make a sample - the array is not of type array (${typeof array})`,
    );
  } else if (array.length === 0) {
    throw new Error(`Can't make a sample - the given array is empty`);
  }

  const min = (config.min as number) ?? 0;
  const max = (config.max as number) ?? array.length;

  if (!max && max !== 0) {
    throw new Error(`Can't make a sample - 'max' is not specified`);
  } else if (min < 0 || max < 0) {
    throw new Error(
      `Can't make a sample - both 'min' and 'max' mustn't be negatives`,
    );
  } else if (min > max) {
    throw new Error(
      `Can't make a sample - maximum sample length is less than the minimum`,
    );
  }

  return (context: GenerationContext) => {
    return selectSample(context.randomizer, array, max, min);
  };
};
