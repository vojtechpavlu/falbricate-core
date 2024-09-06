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

  const minLength = (config.minLength as number) ?? 0;
  const maxLength = (config.maxLength as number) ?? array.length;

  if (!maxLength && maxLength !== 0) {
    throw new Error(`Can't make a sample - 'maxLength' is not specified`);
  } else if (minLength < 0 || maxLength < 0) {
    throw new Error(
      `Can't make a sample - both 'minLength' and 'maxLength' mustn't be negatives`,
    );
  } else if (minLength > maxLength) {
    throw new Error(
      `Can't make a sample - maximum sample length is less than the minimum`,
    );
  }

  return (context: GenerationContext) => {
    return selectSample(context.randomizer, array, maxLength, minLength);
  };
};
