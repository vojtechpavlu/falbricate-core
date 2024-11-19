import { ValueGenerator, ValueGeneratorFactory } from '@falbricate/fw';

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
