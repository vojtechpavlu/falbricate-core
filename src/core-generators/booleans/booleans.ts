import { ValueGenerator, ValueGeneratorConfiguration, ValueGeneratorFactory } from '../../generators/base';
import { GenerationContext } from '../../generators/context';

/**
 * Creates a Value Generator fabricating a random boolean value based on
 * a specified probability (`config.probability`) value
 *
 * @param {ValueGeneratorConfiguration} config Configuration containing a
 * specification of a probability with which should the value be `true`.
 *
 * @returns {ValueGenerator} Value generator providing a random boolean
 * value based on the specified probability.
 *
 * @throws {TypeError} When the probability is not of type `number`
 * @throws {Error} When the probability is not in range `[0, 1]`
 */
export const randomBoolean: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
): ValueGenerator => {
  let probability = config.probability as number | undefined;

  if (typeof probability !== 'number' && probability !== undefined) {
    throw new TypeError(
      `Probability must be a number for random boolean ` +
        `value generator (${typeof probability})`,
    );
  }

  if (!probability && probability !== 0) {
    probability = 0.5;
  }

  if (probability > 1) {
    throw new Error(
      `Specified probability for random boolean value generator can't ` +
        `be greater than 1 (${probability})`,
    );
  } else if (probability < 0) {
    throw new Error(
      `Specified probability for random boolean value generator can't ` +
        `be less than 0 (${probability})`,
    );
  }

  return (context: GenerationContext) => {
    const { randomizer } = context;

    // Hardcoded handling for extremes (higher precision)
    if (probability === 0) return false;
    if (probability === 1) return true;

    // Otherwise
    const random = randomizer();
    return probability > random;
  };
};

/**
 * Generates constantly `true` boolean value ignoring probability
 * and randomizers.
 *
 * @returns {ValueGenerator} Value generator generating always
 * a `true` boolean value
 */
export const constantTrue: ValueGeneratorFactory = (): ValueGenerator => {
  return () => true;
};

/**
 * Generates constantly `false` boolean value ignoring probability
 * and randomizers.
 *
 * @returns {ValueGenerator} Value generator generating always
 * a `false` boolean value
 */
export const constantFalse: ValueGeneratorFactory = (): ValueGenerator => {
  return () => false;
};
