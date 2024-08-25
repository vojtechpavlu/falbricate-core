import {
  ValueGenerator,
  ValueGeneratorConfiguration,
  ValueGeneratorFactory,
} from '../../base';
import { GenerationContext } from '../../context';
import { pickRandomItem } from '../../../utils';

export const pickingGenerator: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
): ValueGenerator => {
  const array = config.array as unknown[];

  if (!Array.isArray(array)) {
    throw new TypeError(
      `Can't pick any item - the array is not of type array (${typeof array})`,
    );
  }
  if (array.length === 0) {
    throw new Error(`Can't pick any item - the given array is empty`);
  }

  return (context: GenerationContext) => {
    return pickRandomItem(context.randomizer, array);
  };
};
