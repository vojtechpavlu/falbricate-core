import { ValueGenerator, ValueGeneratorFactory } from '../../generators/base';

/**
 * Generator providing a constant `undefined` value.
 *
 * @returns {ValueGenerator} providing constant `undefined` value.
 */
export const undefinedGenerator: ValueGeneratorFactory = (): ValueGenerator => {
  return () => {
    return undefined; // eslint-disable-line unicorn/no-useless-undefined
  };
};
