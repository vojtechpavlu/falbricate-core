import { ValueGenerator, ValueGeneratorConfiguration, ValueGeneratorFactory } from '../../generators';
import { deepCopy } from '../../utils/deep-copy';

/**
 * Generates a deep copy of the given constant value.
 *
 * @param {ValueGeneratorConfiguration} config Configuration specifying
 * what value's deep copy should be returned.
 *
 * @returns {ValueGenerator} Value generator returning a deep copy
 * of the given value.
 */
export const constantGenerator: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
): ValueGenerator => {
  const value: unknown = deepCopy(config.value);

  return () => value;
};
