import { GenerationContext } from '../../generators';
import {
  ValueGenerator,
  ValueGeneratorConfiguration,
  ValueGeneratorFactory,
} from '../../generators';
import { randomInteger } from '../../utils';

/**
 * Generates a random integer within a configured range.
 *
 * @param {ValueGeneratorConfiguration} config Configuration object
 * specifying the `min` (optional) and `max` (required) bounds of
 * a desired range. When `min` is missing, `min=0` is used.
 *
 * @returns {ValueGenerator} Being able to generate an integer
 * within the range
 *
 * @throws {Error} When `max` is missing
 * @throws {Error} When `max` < `min`
 */
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

/**
 * Factory for a {@link ValueGenerator} providing a random value within
 * a range of `[0, 9]`
 *
 * @returns {ValueGenerator} Generator providing values within a range of `[0, 9]`
 */
export const unitsGenerator: ValueGeneratorFactory = (): ValueGenerator =>
  integerGenerator({
    min: 0,
    max: 9,
  });

/**
 * Factory for a {@link ValueGenerator} providing a random value within
 * a range of `[10, 99]`
 *
 * @returns {ValueGenerator} Generator providing values within a range of `[10, 99]`
 */
export const tensGenerator: ValueGeneratorFactory = (): ValueGenerator =>
  integerGenerator({
    min: 10,
    max: 99,
  });

/**
 * Factory for a {@link ValueGenerator} providing a random value within
 * a range of `[100, 999]`
 *
 * @returns {ValueGenerator} Generator providing values within a range of `[100, 999]`
 */
export const hundredsGenerator: ValueGeneratorFactory = (): ValueGenerator =>
  integerGenerator({
    min: 100,
    max: 999,
  });

/**
 * Factory for a {@link ValueGenerator} providing a random value within
 * a range of `[1000, 9999]`
 *
 * @returns {ValueGenerator} Generator providing values within a range of `[1000, 9999]`
 */
export const thousandsGenerator: ValueGeneratorFactory = (): ValueGenerator =>
  integerGenerator({
    min: 1000,
    max: 9999,
  });
